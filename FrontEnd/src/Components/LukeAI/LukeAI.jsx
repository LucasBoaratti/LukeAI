import { useState, useEffect, useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DeletarMensagensModal } from "../Modais/DeletarMensagensModal";
import axios from "axios";

// Validações utilizando o zod
const validacaoPrompt = z.object({
    prompt: z.string()
        .min(1, "Erro: o prompt não pode ser vazio.")
        .max(500, "O prompt não pode passar de 500 caracteres."),
});

export function LukeAI() {
    // Estados que controlam o prompt, o modal e a resposta
    const [prompt, setPrompt] = useState([]);
    const [resposta, setResposta] = useState([]);
    const [modal, setModal] = useState(false);
    const copiarMensagemIA = useRef(null);

    const {
        register, //Registre esses dados e valide
        handleSubmit, //Assim que o prompt for enviado
        reset, //E reseta o input
        formState: { errors }, //Além de registrar os erros
    } = useForm({
        resolver: zodResolver(validacaoPrompt), //Fazendo a resolução com o schema acima (validacaoPrompt)
    });

    // Função de copiar a mensagem da IA
    function copiarMensagem() {
        if (copiarMensagemIA.current) {
            const selecionarTexto = copiarMensagemIA.current.innerText;

            navigator.clipboard.writeText(selecionarTexto)
            .then(() => {
                alert("Mensagem copiada com sucesso!");
            })
            .catch((error) => {
                console.error("Erro ao copiar mensagem: ", error);
            });
        }
    }

    // Função assíncrona para postar o prompt do usuário
    async function post_prompt(data) {
        // Salvando os dados do usuário no prompt
        const dados = {
            ...data,
        }

        // Validando se o usuário enviou nenhuma requisição
        if(!dados.prompt || dados.prompt.trim() === "") {
            alert("O prompt não pode ser vazio.");

            return;
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

        // Rolagem automática
        const mensagens = document.querySelector(".mensagens");

        if (mensagens) {
            mensagens.scrollTop = mensagens.scrollHeight;
        }
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
                                            <pre><code ref={copiarMensagemIA}>{mensagem.resposta}</code></pre>
                                            <button type="button" onClick={copiarMensagem} className="botaoCopiar"><i class="bi bi-copy"></i></button>
                                        </div>
                                    )
                                    // Se não for, mostra uma resposta comum
                                    : (
                                        <div className="mensagem">
                                            <p className="mensagem" ref={copiarMensagemIA}>{mensagem.resposta}</p>
                                            <button type="button" onClick={copiarMensagem} className="botaoCopiar"><i class="bi bi-copy"></i></button>
                                        </div>
                                    )
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
                    {/* Botão de apagar mensagens */}
                    <div className="apagarMensagens">
                        <button type="button" className="botaoApagar" onClick={() => setModal(true)}>Apagar mensagens</button>
                    </div>
                    <DeletarMensagensModal openModal={modal} closeModal={() => setModal(false)} atualizarChat={get_resposta}/>
                </section>
            </section>
        </main>
    );
}