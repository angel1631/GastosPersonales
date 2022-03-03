import React from "react";
import { CuadroResumen } from "./CuadroResumen";
import {format_currency} from '../../Core/functions/number';
import { ContainerList } from "../../Core/components/ContainerList";
import {FaEdit, FaTrash} from 'react-icons/fa';

function List({buy_active, form_state, form_item_visible, headers=[], buys}){
    let [form,setForm] = form_state;
    let buy = buys[0][buy_active[0][1]]; 
    if(buy.detail.length>0 && headers.length==0)
        headers = Object.keys(buy.detail[0]);
    
    let delete_item = (index)=>{
        let c_buys = JSON.parse(JSON.stringify(buys[0]));
        c_buys[buy_active[1]].detail.splice(index,1);
        buys[1](c_buys);
    }
    let editar_item = (index)=>{
        form_item_visible(true);
        let item = {...buy.detail[index]};
        
        setForm(item);
    }
    return (
        <ContainerList title={`${buy.title} (${buy.createdAt})`} onClickAdd={()=>form_item_visible(true)} onClickBack={()=>buy_active[1]([0,-1])}>
            <div className="w-full divide-y divide-stone-300 shadow-lg bg-slate-50">
                {
                    buy.detail.map((line,index)=>(
                        <div className="w-full flex text-center" key={Math.floor(Math.random() * 10000)}>
                            <div className="w-5/12 text-left px-1 ">{line.producto}</div>
                            <div className="w-1/12 px-1 ">{line.cantidad}</div>
                            <div className="w-2/12 px-1 ">{format_currency({val:line.precio})}</div>
                            <div className="w-2/12 px-1 ">{format_currency({val:line.total})}</div>
                            <div className="w-1/12 px-1 ">
                                <button onClick={()=>{editar_item(index)}}><FaEdit className=" text-blue-400 text-xl" /></button>
                            </div>
                            <div className="w-1/12 px1 ">
                                <button onClick={()=>delete_item(index)}><FaTrash className=" text-orange-700 text-xl"></FaTrash></button>
                            </div>
                        </div>
                    ))
                }
                
            </div>
            <CuadroResumen buy_active={buy_active} buys={buys}/>
        </ContainerList>
    );
}
export {List}