import React from "react";
import {getDateShort} from '../../Core/functions/date';
import {format_currency} from '../../Core/functions/number';

function ListPrev({item_searched, buys}){
    let match_items = [];
    if(item_searched.length>3){
        buys[0].map((buy)=>{
            buy.detail.map(item=>{
                if((item.producto.toLowerCase()).includes(item_searched.toLowerCase())) 
                    match_items.push({buy: buy.title, date: getDateShort(buy.createdAt), item: item.producto, price: item.precio})
            });
        });    
    }
    match_items = match_items.slice(-3);
    return(
        <div>
            <h2 className="font-bold text-xl p-2 text-right">Compras anteriores</h2>
            <div className="w-full flex flex-col divide-y divide-zinc-700 bg-white shadow-lg rounded-lg px-2"> 
                {match_items.map((item,index)=>{
                    return(
                    <div className="w-full flex py-2" key={index}>
                        <span className="px-2">{item.buy}</span>
                        <span className="px-2">{item.date}</span>
                        <span className="px-2">{item.item}</span>
                        <span className="px-2">{format_currency({val:item.price})}</span>
                    </div>);
                })}  
            </div>
        </div>
    );
}
export {ListPrev};