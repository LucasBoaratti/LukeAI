# Arquivo de exemplo para realizar perguntas para a IA

# Importações
import os
import requests
import json
# dotenv permite carregar variáveis de ambiente de um arquivo .env (não confundir com a pasta venv)
from dotenv import load_dotenv 

# Carregando as variáveis do arquivo .env
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

# URL da API do Gemini com o gemini 2.5 flash lite
url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key={API_KEY}"

# Resposta da requisição será no formato json
headers = {
    "Content-Type": "application/json"
}

# Input para o usuário fazer a pergunta (não obrigatório)
prompt = input("Faça uma pergunta: ")

# Conteúdo que será enviado para o modelo (também é a estrutura que a API espera)
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

# Convertendo a resposta em JSON, após uma requisição POST
response = requests.post(url, headers=headers, data=json.dumps(data))

# Verificando se a resposta foi enviada com sucesso
if response.status_code == 200:
    result = response.json()
    print(result["candidates"][0]["content"]["parts"][0]["text"])
else:
    print("Erro:", response.status_code)
    print(response.text)

# Link das tabelas de solicitações: https://ai.google.dev/gemini-api/docs/rate-limits?hl=pt-br#free-tier