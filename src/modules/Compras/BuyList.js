import React from 'react';
import { Context } from '../../Context';
import {getDateShort} from '../../Core/functions/date';

function BuyList({buy_active, form_buy_visible}){
    let {states:{buys}} = React.useContext(Context);
    let delete_buy = (index)=>{
        let c_buys = [...buys[0]];
        c_buys.splice(index,1);
        buys[1](c_buys);
    }
    
    return(
        <div className='w-full flex flex-col px-2 relative h-full'>
            <div className='divide-y divide-stone-300 shadow-md flex flex-col '>
                {buys[0].map((buy,index)=>
                (
                <div className='w-full flex' key={buy.id}>
                    <div className='w-full py-1 bg-slate-50  px-2' onClick={()=>{buy_active[1]([buy.id, index])}} >{buy.title} ({getDateShort(buy.createdAt)})</div> 
                    <div className="w-1/12 px1">
                        <button onClick={()=>delete_buy(index)}><i className="text-red-400 text-xl ri-delete-bin-5-fill"></i></button>
                    </div>
                </div>
                ))}
            </div>
            <button className="bg-emerald-300 w-full py-2 rounded-md mt-3 text-white font-bold " onClick={()=>form_buy_visible(true)}>Agregar Compra</button>
        </div>
    );
}
export {BuyList}