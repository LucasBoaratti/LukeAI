import os, requests, json
from rest_framework.generics import ListCreateAPIView
from dotenv import load_dotenv
from .models import TextoGenerativo
from .serializers import TextoGenerativoSerializer

# Create your views here.

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

class TextoGenerativoLCAPIView(ListCreateAPIView):
    # Pegando os dados e ordenando em ordem crescente
    queryset = TextoGenerativo.objects.all().order_by("data_criacao")
    
    serializer_class = TextoGenerativoSerializer

    def perform_create(self, serializer):
        # Acessando os dados enviados pelo usuário, na chave prompt
        prompt = self.request.data.get("prompt", "")

        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key={API_KEY}"

        headers = {
            "Content-Type": "application/json",
        }

        data = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": prompt,
                        }
                    ]
                }
            ]
        }

        response = requests.post(url, headers=headers, data=json.dumps(data))

        if response.status_code == 200:
            # Retornando um campo json pela API do usuário
            resposta_json = response.json()
            # Extraindo a resposta gerada pela IA
            # Candidates: lista de respostas geradas pela IA (e pega a resposta mais relevante [0])
            resposta = resposta_json["candidates"][0]["content"]["parts"][0]["text"]
        else:
            # Mostrando o erro pelo código HTTP e seus detalhes
            resposta = f"Erro: {response.status_code}: {response.text}"
        
        # Salvando o texto e a resposta no banco de dados
        serializer.save(prompt=prompt, resposta=resposta)