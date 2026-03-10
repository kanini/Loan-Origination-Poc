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


def extract_entities_from_model(extracted_text, selected_model, document_type="loan"):
    """
    Extract entities from document based on document type.
    document_type: 'loan' or 'tax'
    """
    if document_type == "loan":
        prompt = f"""System: You are a senior financial documentation specialist with 10 years of experience in USA financial loan and banking services. Your expertise includes loans and financial data analysis.

Document Type: LOAN APPLICATION

Document Content:
{extracted_text}

Instructions:
- Identify and list all relevant entities within the loan application document grouped by category.
- Categories: Lender Information, Borrower Information, Loan Details, Property Information, Financial Information, Employment Information
- Extract key-value pairs for each category.
- For Lender Information: Extract lender name, address, phone, email, NMLS ID, license number
- For Borrower Information: Extract borrower name(s), SSN (last 4 digits only), date of birth, contact information, address
- For Loan Details: Extract loan amount, interest rate, loan term, loan type, loan number, loan purpose, APR, monthly payment
- For Property Information: Extract property address, property type, property value, purchase price, occupancy type
- For Financial Information: Extract income details, assets, liabilities, credit score, down payment, closing costs
- For Employment Information: Extract employer name, job title, employment duration, income
- Format the output as a JSON object where keys are category names and values are objects of field:value pairs.
- If a category has no data, omit it.
- Extract only information that is explicitly present in the document.
Strictly the response must be in valid JSON format only, no markdown fences."""
    
    elif document_type == "tax":
        prompt = f"""System: You are a senior tax documentation specialist with 10 years of experience in USA tax returns and IRS forms. Your expertise includes personal and business tax analysis.

Document Type: TAX RETURN FORM

Document Content:
{extracted_text}

Instructions:
- Identify and list all relevant entities within the tax return document grouped by category.
- Categories: Taxpayer Information, Filing Information, Income Details, Deductions, Tax Calculations, Refund or Amount Due
- Extract key-value pairs for each category.
- For Taxpayer Information: Extract taxpayer name, SSN (last 4 digits only), address, filing status, dependents
- For Filing Information: Extract tax year, form type (1040, 1040-SR, etc.), filing date, tax period
- For Income Details: Extract wages/salaries, interest income, dividend income, business income, capital gains, total income, adjusted gross income (AGI)
- For Deductions: Extract standard/itemized deduction amount, qualified business income deduction, total deductions
- For Tax Calculations: Extract taxable income, total tax, federal income tax withheld, estimated tax payments, credits
- For Refund or Amount Due: Extract refund amount or amount owed, payment method
- Format the output as a JSON object where keys are category names and values are objects of field:value pairs.
- If a category has no data, omit it.
- Extract only information that is explicitly present in the document.
Strictly the response must be in valid JSON format only, no markdown fences."""
    
    else:
        return json.dumps({"error": f"Invalid document type: {document_type}"})

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
    # Check if this is a dual document upload
    loan_file = request.FILES.get('loan_file')
    tax_file = request.FILES.get('tax_file')
    single_file = request.FILES.get('pdf_file')
    
    selected_model = request.POST.get('model', 'openai')
    
    # Handle single file upload (backward compatibility)
    if single_file and not loan_file and not tax_file:
        return _process_single_document(single_file, selected_model)
    
    # Handle dual document upload
    if not loan_file or not tax_file:
        return JsonResponse({
            "error": "Both loan application and tax return documents are required"
        }, status=400)
    
    try:
        # Process loan document
        loan_result = _process_document(loan_file, selected_model, "loan")
        if "error" in loan_result:
            return JsonResponse(loan_result, status=500)
        
        # Process tax document
        tax_result = _process_document(tax_file, selected_model, "tax")
        if "error" in tax_result:
            return JsonResponse(tax_result, status=500)
        
        return JsonResponse({
            "success": True,
            "model": selected_model,
            "documents": {
                "loan": loan_result,
                "tax": tax_result
            }
        })
    
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


def _process_document(pdf_file, selected_model, document_type):
    """Process a single document and return extracted entities"""
    save_dir = os.path.join(settings.MEDIA_ROOT, "uploads")
    os.makedirs(save_dir, exist_ok=True)
    file_path = os.path.join(save_dir, pdf_file.name)

    with default_storage.open(file_path, 'wb+') as destination:
        for chunk in pdf_file.chunks():
            destination.write(chunk)

    file_url = settings.MEDIA_URL + "uploads/" + pdf_file.name

    extracted_text = extract_text_from_pdf(file_path)

    if not extracted_text or extracted_text.startswith("Error"):
        return {
            "error": extracted_text or "Failed to extract text from PDF",
            "file_name": pdf_file.name
        }

    model_output = extract_entities_from_model(extracted_text, selected_model, document_type)

    try:
        cleaned = model_output.strip()
        if cleaned.startswith("```"):
            cleaned = cleaned.split("\n", 1)[1]
            if cleaned.endswith("```"):
                cleaned = cleaned[:-3]
        entities = json.loads(cleaned)
    except (json.JSONDecodeError, Exception):
        entities = {"raw_output": model_output}

    return {
        "file_name": pdf_file.name,
        "file_url": file_url,
        "file_size": pdf_file.size,
        "document_type": document_type,
        "extracted_text": extracted_text[:2000],
        "entities": entities,
    }


def _process_single_document(pdf_file, selected_model):
    """Process single document for backward compatibility"""
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

    model_output = extract_entities_from_model(extracted_text, selected_model, "loan")

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
        loan_text = body.get("loan_text", "")
        tax_text = body.get("tax_text", "")
        history = body.get("history", [])

        azure_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT", "")
        azure_key = os.getenv("AZURE_OPENAI_API_KEY", "")
        azure_deployment = os.getenv("AZURE_OPENAI_DEPLOYMENT", "")
        azure_api_version = os.getenv("AZURE_OPENAI_API_VERSION", "2024-02-01")

        # Build context from available documents
        context_parts = []
        if loan_text:
            context_parts.append(f"LOAN APPLICATION DOCUMENT:\n{loan_text[:3000]}")
        if tax_text:
            context_parts.append(f"\n\nTAX RETURN DOCUMENT:\n{tax_text[:3000]}")
        if document_text and not loan_text and not tax_text:
            context_parts.append(f"DOCUMENT:\n{document_text[:3000]}")
        
        context = "\n".join(context_parts) if context_parts else "No document context available."

        if azure_endpoint and azure_key and azure_deployment:
            import httpx
            url = f"{azure_endpoint}/openai/deployments/{azure_deployment}/chat/completions?api-version={azure_api_version}"
            
            messages = [
                {
                    "role": "system",
                    "content": f"""You are a helpful financial document assistant. You can answer questions about loan applications and tax returns.

You have access to the following documents:
{context}

Answer questions based on the document content. If a question relates to specific document (loan or tax), reference that document. Be specific and accurate."""
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
                chat_prompt = f"""You are a helpful financial document assistant. Answer questions based on these documents:

{context}

User question: {message}

Provide a clear, concise answer based on the document content."""
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
