export function LucAI() {
    return (
        <main>
            {/* Container do chat */}
            <section className="chatContainer">
                {/* Mensagens */}
                <section className="mensagens">
                    {/* Mensagens de exemplo */}
                    <p className="mensagem">Olá, vamos conversar?</p>
                    <p className="mensagem usuario">Quero saber sobre react.</p>
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