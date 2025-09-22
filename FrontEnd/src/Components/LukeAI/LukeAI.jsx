import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

// Validações utilizando o zod
const validacaoPrompt = z.object({
    prompt: z.string()
        .min(1, "Erro: o prompt não pode ser vazio.")
        .max(500, "O prompt não pode passar de 500 caracteres."),
});

export function LukeAI() {
    // Estados que controlam o prompt e a resposta
    const [prompt, setPrompt] = useState([]);
    const [resposta, setResposta] = useState([]);

    const {
        register, //Registre esses dados e valide
        handleSubmit, //Assim que o prompt for enviado
        reset, //E reseta o input
        formState: { errors }, //Além de registrar os erros
    } = useForm({
        resolver: zodResolver(validacaoPrompt), //Fazendo a resolução com o schema acima (validacaoPrompt)
    });

    // Função assíncrona para postar o prompt do usuário
    async function post_prompt(data) {
        // Salvando os dados do usuário no prompt
        const dados = {
            ...data,
        }

        try {
            // Requisição post
            await axios.post("http://127.0.0.1:8000/LukeAI/prompt", dados);

            get_resposta();
            reset();
            setPrompt("");
        }
        catch(error) {
            console.error("Erro ao enviar o prompt: ", error.response?.message);

            setPrompt("");
            // Transformando o erro em array, para atribuir uma string
            setResposta((erro) => [
                ...erro,
                {
                    prompt: "Erro ao enviar o prompt.",
                    resposta: "Ocorreu um erro. Tente novamente.",
                },
            ]);
        }
    }   

    // Função assíncrona para pegar a resposta
    async function get_resposta() {
        try {
            // Requisição get
            const response = await axios.get("http://127.0.0.1:8000/LukeAI/prompt");

            setPrompt("");
            setResposta(response.data);
        }        
        catch(error) {
            console.error("Erro ao buscar resposta: ", error.response?.message);

            // Transformando o erro em array, para atribuir uma string
            setResposta([
                {
                    prompt: "Erro ao buscar dados.",
                    resposta: "Não foi possível carregar as mensagens.",
                },
            ]);
        }
    }

    useEffect(() => {
        get_resposta();
    }, []);

    return (
        <main>
            {/* Container do chat */}
            <section className="chatContainer">
                {/* Mensagens */ }
                <section className="mensagens">
                    {/* Mensagem de boas vindas */}
                    <div className="mensagemIA">
                        <p className="mensagem">Olá, vamos conversar?</p>
                    </div>
                    {/* Mensagens do usuário */}    
                    {resposta.map((mensagem, index) => (
                        <div key={index}>
                            {/* Prompt do usuário */}
                            <div className="mensagemUsuario">
                                <p className="mensagem usuario">{mensagem.prompt}</p>
                            </div>
                            {/* Resposta da IA */}
                            <div className="mensagemIA">
                                {/* Verificando o tipo de resposta da IA */}
                                {mensagem.resposta.includes("```")
                                    // Se pedir código, mostra em um formato diferente
                                    ? (
                                        <div className="mensagem">
                                            <pre><code>{mensagem.resposta}</code></pre>
                                        </div>
                                    )
                                    // Se não for, mostra uma resposta comum
                                    : <p className="mensagem">{mensagem.resposta}</p>
                                } 
                            </div>
                        </div>
                    ))}
                </section>
                {/* Caixa de Perguntas */}
                <section className="inputContainer">
                    <form onSubmit={handleSubmit(post_prompt)} className="inputPergunta">
                        <input type="text" className="prompt" placeholder="Faça uma pergunta..." {...register("prompt")} tabIndex={0} onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                // Evita o comportamento padrão do formulário
                                e.preventDefault(); 
                                // Executa a função com validação
                                handleSubmit(post_prompt)();
                            }
                        }} />
                        <button type="submit" className="enviarPrompt">
                            <i class="bi bi-send-fill" tabIndex={0} onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                // Envio com enter aplicado no botão também
                                e.preventDefault();
                                handleSubmit(post_prompt)();
                            }
                        }}></i>
                        </button>
                        <div className="erroPrompt">
                            {errors.prompt && <p>{errors.prompt.message}</p>}
                        </div>
                    </form>
                </section>
            </section>
        </main>
    );
}