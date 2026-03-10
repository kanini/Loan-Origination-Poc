import os
import json
import fitz
from django.conf import settings
from django.core.files.storage import default_storage
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from dotenv import load_dotenv

import openai
import google.generativeai as genai

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

openai.api_key = OPENAI_API_KEY
genai.configure(api_key=GEMINI_API_KEY)


def extract_text_from_pdf(file_path):
    try:
        doc = fitz.open(file_path)
        extracted_text = "\n".join([page.get_text() for page in doc])
        doc.close()
        return extracted_text
    except Exception as e:
        return f"Error reading PDF: {str(e)}"


def extract_entities_from_model(extracted_text, selected_model):
    prompt = f"""System: You are a senior financial documentation specialist with 10 years of experience in USA financial loan and banking services. Your expertise includes loans and financial data analysis.

Document Content:
{extracted_text}

Instructions:
- Identify and list all relevant entities within the document grouped by category.
- Categories: Lender Information, Borrower Details, Loan Terms, Location Data, Person Information
- Extract key-value pairs for each category.
- Format the output as a JSON object where keys are category names and values are objects of field:value pairs.
- If a category has no data, omit it.
Strictly the response must be in valid JSON format only, no markdown fences."""

    try:
        if selected_model == "openai":
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.2,
                max_completion_tokens=4000,
            )
            return response.choices[0].message['content']

        elif selected_model == "gemini":
            model = genai.GenerativeModel('gemini-2.5-flash')
            response = model.generate_content(prompt)
            return response.text

        else:
            return json.dumps({"error": "Invalid model selected."})

    except Exception as e:
        return json.dumps({"error": f"Error using model: {str(e)}"})


@csrf_exempt
@require_http_methods(["POST"])
def api_extract(request):
    if not request.FILES.get('pdf_file'):
        return JsonResponse({"error": "No PDF file provided"}, status=400)

    pdf_file = request.FILES['pdf_file']
    selected_model = request.POST.get('model', 'openai')

    save_dir = os.path.join(settings.MEDIA_ROOT, "uploads")
    os.makedirs(save_dir, exist_ok=True)
    file_path = os.path.join(save_dir, pdf_file.name)

    with default_storage.open(file_path, 'wb+') as destination:
        for chunk in pdf_file.chunks():
            destination.write(chunk)

    file_url = settings.MEDIA_URL + "uploads/" + pdf_file.name

    extracted_text = extract_text_from_pdf(file_path)

    if not extracted_text or extracted_text.startswith("Error"):
        return JsonResponse({
            "error": extracted_text or "Failed to extract text from PDF"
        }, status=500)

    model_output = extract_entities_from_model(extracted_text, selected_model)

    try:
        cleaned = model_output.strip()
        if cleaned.startswith("```"):
            cleaned = cleaned.split("\n", 1)[1]
            if cleaned.endswith("```"):
                cleaned = cleaned[:-3]
        entities = json.loads(cleaned)
    except (json.JSONDecodeError, Exception):
        entities = {"raw_output": model_output}

    return JsonResponse({
        "file_name": pdf_file.name,
        "file_url": file_url,
        "file_size": pdf_file.size,
        "model": selected_model,
        "extracted_text": extracted_text[:2000],
        "entities": entities,
    })


@csrf_exempt
@require_http_methods(["POST"])
def api_chat(request):
    try:
        body = json.loads(request.body)
        message = body.get("message", "")
        document_text = body.get("document_text", "")
        history = body.get("history", [])

        azure_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT", "")
        azure_key = os.getenv("AZURE_OPENAI_API_KEY", "")
        azure_deployment = os.getenv("AZURE_OPENAI_DEPLOYMENT", "")
        azure_api_version = os.getenv("AZURE_OPENAI_API_VERSION", "2024-02-01")

        if azure_endpoint and azure_key and azure_deployment:
            import httpx
            url = f"{azure_endpoint}/openai/deployments/{azure_deployment}/chat/completions?api-version={azure_api_version}"
            
            messages = [
                {
                    "role": "system",
                    "content": f"You are a helpful assistant that answers questions about the following document:\n\n{document_text[:3000]}"
                }
            ]
            for h in history[-10:]:
                messages.append({"role": h.get("role", "user"), "content": h.get("content", "")})
            messages.append({"role": "user", "content": message})

            resp = httpx.post(
                url,
                headers={
                    "Content-Type": "application/json",
                    "api-key": azure_key,
                },
                json={"messages": messages, "max_completion_tokens": 1000},
                timeout=30.0,
            )
            
            if resp.status_code == 200:
                data = resp.json()
                reply = data["choices"][0]["message"]["content"]
                return JsonResponse({"reply": reply})
            else:
                return JsonResponse({"reply": f"Azure OpenAI error: {resp.status_code} - {resp.text}"}, status=502)
        else:
            if GEMINI_API_KEY:
                model = genai.GenerativeModel('gemini-2.5-flash')
                chat_prompt = f"""You are a helpful assistant. Answer questions based on this document:

{document_text[:3000]}

User question: {message}"""
                response = model.generate_content(chat_prompt)
                return JsonResponse({"reply": response.text})
            else:
                return JsonResponse({
                    "reply": "No Azure OpenAI or Gemini API configured. Please set AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_KEY, and AZURE_OPENAI_DEPLOYMENT in .env"
                }, status=500)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
@require_http_methods(["GET"])
def api_health(request):
    return JsonResponse({"status": "ok"})
