# views.py

import os
import fitz
from django.shortcuts import render
from django.conf import settings
from django.core.files.storage import default_storage
from django.views.decorators.csrf import csrf_exempt
import os
from dotenv import load_dotenv

load_dotenv()

import openai
import google.generativeai as genai

# Load keys from env or Django settings
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

openai.api_key = OPENAI_API_KEY
genai.configure(api_key=GEMINI_API_KEY)

@csrf_exempt
def extract_view(request):
    extracted_text = ""
    model_output = ""

    if request.method == 'POST' and request.FILES.get('pdf_file'):
        pdf_file = request.FILES['pdf_file']
        selected_model = request.POST.get('model')

        # Save the uploaded file
        save_dir = os.path.join(settings.MEDIA_ROOT, "uploads")
        os.makedirs(save_dir, exist_ok=True)
        file_path = os.path.join(save_dir, pdf_file.name)
        with default_storage.open(file_path, 'wb+') as destination:
            for chunk in pdf_file.chunks():
                destination.write(chunk)

        try:
            doc = fitz.open(file_path)
            extracted_text = "\n".join([page.get_text() for page in doc])
            doc.close()
        except Exception as e:
            extracted_text = f"Error reading PDF: {str(e)}"

        # Send to selected model
        if extracted_text and selected_model:
            prompt = f"Extract key information from the following document:\n\n{extracted_text[:6000]}"

            try:
                if selected_model == "openai":
                    response = openai.ChatCompletion.create(
                        model="gpt-3.5-turbo",
                        messages=[{"role": "user", "content": prompt}],
                        temperature=0.2,
                        max_completion_tokens=500,
                    )
                    model_output = response.choices[0].message['content']

                elif selected_model == "gemini":
                    model = genai.GenerativeModel('gemini-2.5-pro-exp-03-25')
                    response = model.generate_content(prompt)
                    model_output = response.text

                else:
                    model_output = "Invalid model selected."

            except Exception as e:
                model_output = f"Error using model: {str(e)}"

    return render(request, 'index.html', {
        'extracted_text': extracted_text,
        'model_output': model_output
    })
