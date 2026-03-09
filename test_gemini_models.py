import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

# Use the API key from views.py
GEMINI_API_KEY = "AIzaSyAVBoKAUU-6QLQOePxcMYkhrTV_plIGPkY"

genai.configure(api_key=GEMINI_API_KEY)

print("Listing available Gemini models:\n")
for model in genai.list_models():
    if 'generateContent' in model.supported_generation_methods:
        print(f"Model: {model.name}")
        print(f"  Display Name: {model.display_name}")
        print(f"  Description: {model.description}")
        print(f"  Supported methods: {model.supported_generation_methods}")
        print()
