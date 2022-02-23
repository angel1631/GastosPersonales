import React from 'react';
import { Context } from '../../Context';
import {getDateShort} from '../../Core/functions/date';

function BuyList({buy_active}){
    let {states:{buys}} = React.useContext(Context);
    console.log(buys[0]);
    
    return(
        <ul>
            {buys[0].map((buy,index)=>
            (
               <li onClick={()=>{buy_active[1]([buy.id, index])}} key={buy.id}>{buy.title} ({getDateShort(buy.createdAt)})</li> 
            ))}
        </ul>
    );
}
export {BuyList}