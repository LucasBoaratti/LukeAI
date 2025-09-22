import axios from "axios";
import { useNavigate } from "react-router-dom";

export function DeletarMensagensModal({openModal, closeModal, atualizarChat}) {
    // Verificando se o modal está aberto
    if (!openModal) {
        return null;
    }

    // Navegação para o modal
    const navigate = useNavigate();

    // Função assíncrona que apaga todas as mensagens do chat
    async function apagar_mensagens() {
        try {
            axios.delete("http://127.0.0.1:8000/LukeAI/apagarMensagens");

            alert("Todas as mensagens foram apagadas com sucesso!");

            closeModal()

            atualizarChat();

            navigate("/");
        }
        catch(error) {
            console.error("Erro ao apagar as mensagens: ", error.response?.data);
        }
    }

    return (
        // Modal para deletar as mensagens
        <section className="containerModal">
            <div className="modal">
                <p>Tem certeza que deseja apagar todas as mensagens?</p>
                <div className="botaoEscolha">
                    <button type="button" onClick={apagar_mensagens} className="botao">Sim</button>
                    <button type="button" onClick={closeModal} className="botao">Não</button>
                </div>
            </div>
        </section>
    );
}