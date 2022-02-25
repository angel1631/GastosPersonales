import React from "react";
import { CuadroResumen } from "./CuadroResumen";
import { Context } from '../../Context';
import {format_currency} from '../../Core/functions/number';

function List({buy_active, form_state, form_item_visible, headers=[]}){
    let [form,setForm] = form_state;
    let {states:{buys}} = React.useContext(Context);
    let buy = buys[0][buy_active[1]]; 
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
        console.log(item);
        setForm(item);
    }

    return (
        <div className="w-full p-2">
            <div className="w-full divide-y divide-stone-300 shadow-lg bg-slate-50">
                {
                    buy.detail.map((line,index)=>(
                        <div className="w-full flex text-center" key={Math.floor(Math.random() * 10000)}>
                            <div className="w-5/12 text-left px-1 ">{line.producto}</div>
                            <div className="w-1/12 px-1 ">{line.cantidad}</div>
                            <div className="w-2/12 px-1 ">{format_currency({val:line.precio})}</div>
                            <div className="w-2/12 px-1 ">{format_currency({val:line.total})}</div>
                            <div className="w-1/12 px-1 ">
                                <button onClick={()=>{editar_item(index)}}><i className="text-blue-400 text-xl ri-edit-2-fill"></i></button>
                            </div>
                            <div className="w-1/12 px1 ">
                                <button onClick={()=>delete_item(index)}><i className="text-red-400 text-xl ri-delete-bin-5-fill"></i></button>
                            </div>
                        </div>
                    ))
                }
                
            </div>
            <CuadroResumen buy_active={buy_active}/>
            
            <button className=" bg-emerald-300 w-full py-2 rounded-md text-white font-bold mt-2 " onClick={()=>form_item_visible(true)}>Agregar Item</button>
        </div>
    );
}
export {List}