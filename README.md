# 🖥️ LukeAI 🖥️

#### A LukeAI é um site onde você pode conversar com a LukeAI que ela te responde na hora, que nem as outras IAs famosas como ChatGPT, Gemini, Copilot etc. Ela foi feita usando a API do Gemini, na versão 2.5 flash.

# 🤖 Como usar o site 🤖

1. Clique no botão Code e copie a URL do projeto:

```bash
https://github.com/LucasBoaratti/LukeAI.git
```

2. Abra o Prompt de comando (ou PowerShell ou GitBash) em sua área de trabalho ou em documentos e realize o seguinte comando:

OBS: Certifique que o Git está instalado no seu computador. Caso não esteja, instale aqui: [Git](https://git-scm.com/downloads)

```bash 
git clone https://github.com/LucasBoaratti/LukeAI.git
```

3. Acesse a pasta do projeto:

```bash
cd .\LukeAI
```

4. Agora, entre no VSCode:

```bash
code .
```

5. Após entrar no VSCode, acesse a [API do Gemini](https://aistudio.google.com/api-keys) para conseguir a chave da API;

6. Depois de pegar a chave da API, volte para o VSCode, abra o terminal pelo atalho CTRL + J ou CTRL + ', e vá até a pasta BackEnd:

```bash
cd .\BackEnd
```

7. E depois crie o ambiente virtual do python:

```bash
python -m venv .venv
```

8. Após a instalação, ative a pasta .venv:

```bash
.\.venv\Scripts\activate
```

9. Agora, instale as bibliotecas com o requirements.txt:

```bash 
pip install -r .\requirements.txt
```

10. E depois, rode o servidor:

```bash
python .\manage.py runserver
```

11. Agora, abra outro terminal clicando em "+" e vá para a pasta FrontEnd:

```bash
cd .\FrontEnd
```

12. Agora, crie a pasta node_modules:

```bash
npm install
```

13: Depois de instalar a pasta, rode o servidor:

```bash
npm run dev
```
#### E pronto! Agora você pode usar a LukeAI e fazer diversas perguntas para ela. Aproveite!

# 💻 Linguagens utilizadas 💻

## FrontEnd

<div style="display: flex;">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" title="React" width="70px" height="70px"/>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" alt="HTML" title="HTML" width="70px" height="70px"/>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" alt="CSS" title="CSS" width="70px" height="70px"/>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg" alt="SASS" width="70px" height="70px" />
</div>

## BackEnd

<div style="display: flex;">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" title="Python" width="70px" height="70px"/>
    <img src="https://icon.icepanel.io/Technology/png-shadow-512/Django.png" alt="Django" title="Django" width="70px" height="70px">
</div>
