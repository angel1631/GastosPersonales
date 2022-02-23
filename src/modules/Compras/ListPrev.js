import React, { useContext } from "react";
import { Context } from "../../Context";
import {getDateShort} from '../../Core/functions/date';

function ListPrev({item_searched}){
    let {states: {buys}} = React.useContext(Context);
    let match_items = [];
    if(item_searched.length>3){
        buys[0].map((buy)=>{
            buy.detail.map(item=>{
                if((item.producto.toLowerCase()).includes(item_searched.toLowerCase())) 
                    match_items.push({buy: buy.title, date: getDateShort(buy.createdAt), item: item.producto, price: item.precio})
            });
        });    
    }
    return(
        <ul> 
            {match_items.map((item,index)=>{
                return(
                <li key={index}>
                    <label>{item.buy}</label>
                    <label>{item.date}</label>
                    <label>{item.item}</label>
                    <label>{item.price}</label>
                </li>);
            })}  
        </ul>
    );
}
export {ListPrev};