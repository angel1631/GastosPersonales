import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Compras from "./modules/Compras/";
import { Gastos } from "./modules/Gastos";
import { Nav } from "./modules/Nav";
import { NotFound } from "./modules/NotFound";
import { Presupuestos } from "./modules/Presupuestos";
import {Home} from './modules/Home';



function App(){
    let menu_active = React.useState(false);
    return (
        <BrowserRouter>
            <div className="app w-full h-screen bg-stone-100 flex flex-col items-center">
                <Nav title="Finance Guru" menu_active={menu_active}></Nav>
                <div onClick={()=>menu_active[1](false)} className=" mt-16 w-full">
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/compras" element={<Compras/>}/>
                        <Route exact path="/Presupuestos" element={<Presupuestos/>}/>
                        <Route exact path="/Gastos" element={<Gastos/>} />
                        <Route path="*" element={<Home/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
        
    );
}
export {App};