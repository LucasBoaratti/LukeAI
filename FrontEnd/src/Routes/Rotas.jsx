import { Route, Routes } from "react-router-dom";
import { LukeAI } from "../Components/LukeAI/LukeAI";
import { Index } from "../Pages/Index";

export function Rotas() {
    return (
        // Roteamento do site
        <Routes>
            {/* Rota para a página do chat */}
            <Route path="/" element={<Index/>}>
                <Route index element={<LukeAI/>}/>
            </Route>
        </Routes>
    );
}