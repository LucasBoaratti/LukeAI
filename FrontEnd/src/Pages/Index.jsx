import { Cabecalho } from "../Components/Cabecalho/Cabecalho";
import { Outlet } from "react-router-dom";

export function Index() {
    // Página de configuração de exibição
    return (
        <>
            <Cabecalho/>
            <Outlet/>
        </>
    );
}