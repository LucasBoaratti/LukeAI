import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

// Validações utilizando o zod
const validacaoPrompt = z.object({
    prompt: z.string()
        .min(1, "O prompt não pode ser vazio.")
        .max(500, "O prompt não pode passar de 500 caracteres."),
});

export function LukeAI() {
    // Estados que controlam o prompt e a resposta
    const [prompt, setPrompt] = useState("");
    const [resposta, setResposta] = useState("");

    const {
        register, //Registre esses dados e valide
        handleSubmit, //Assim que o prompt for enviado
        reset, //E reseta o input
        formState: { errors }, //Além de registrar os erros
    } = useForm({
        resolver: zodResolver(validacaoPrompt), //Fazendo a resolução com o schema acima (validacaoPrompt)
    });

    async function post_prompt(data) {
        // Salvando os dados do usuário no prompt
        const dados = {
            ...data,
        }

        try {
            // Requisição post
            await axios.post("http://127.0.0.1:8000/LukeAI/prompt", dados);

            setPrompt("");
            setResposta("");
        }
        catch(error) {
            console.error("Erro ao enviar o prompt: ", error.response?.data);

            setPrompt("");
            setResposta("Ocorreu um erro. Tente novamente.");
        }
    }   

    return (
        <main>
            {/* Container do chat */}
            <section className="chatContainer">
                {/* Mensagens */}
                <section className="mensagens">
                    {/* Mensagens de exemplo */}
                    <div className="mensagemIA">
                        <p className="mensagem">Olá, vamos conversar?</p>
                    </div>
                    <div className="mensagemUsuario">
                        <p className="mensagem usuario">Quero saber sobre react.</p>
                    </div>
                </section>
                {/* Área de Perguntas */}
                <section className="inputContainer">
                    <div className="inputPergunta">
                        <input type="text" name="prompt" className="prompt" placeholder="Faça uma pergunta..." />
                        <i class="bi bi-send-fill"></i>
                    </div>
                </section>
            </section>
        </main>
    );
}