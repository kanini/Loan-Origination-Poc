# extractor_app/forms.py
from django import forms

class UploadForm(forms.Form):
    pdf_file = forms.FileField()
    model_choice = forms.ChoiceField(choices=[('openai', 'OpenAI'), ('gemini', 'Gemini')])
    prompt = forms.CharField(widget=forms.Textarea)
