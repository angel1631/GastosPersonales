import React from "react";
import {ContextProvider} from "./Context";
import Compras from "./modules/Compras/"

function App(){
    return (
        <ContextProvider>
            <div className="app w-full h-screen bg-stone-100 flex flex-col items-center">
                <div className="w-3/4  text-center bg-cyan-400 py-2 px-7 rounded-lg mt-2 shadow-md mb-4 font-bold">Gastos Personales</div>
                <Compras />
            </div>
        </ContextProvider>
    );
}
export {App};