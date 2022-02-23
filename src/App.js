import React from "react";
import {ContextProvider} from "./Context";
import Compras from "./modules/Compras/"

function App(){
    return (
        <ContextProvider>
           <Compras/>
        </ContextProvider>
    );
}
export {App};