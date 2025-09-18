import { Cabecalho } from "./Components/Cabecalho/Cabecalho";
import { LucAI } from "./Components/LucAI/LucAI";
import './Styles/Main.scss';

function App() {
    return (
        <>
            <Cabecalho/>
            <div style={{ flex: 1 }}>
                <LucAI/>
            </div>
        </>
    );
}

export default App;