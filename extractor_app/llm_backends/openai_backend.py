import openai

class OpenAIBackend:
    def __init__(self, api_key):
        openai.api_key = api_key

    def extract_info(self, prompt):
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0
        )
        return response['choices'][0]['message']['content']
