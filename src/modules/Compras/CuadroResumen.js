import React from "react"
import { Context } from '../../Context';
import {format_currency} from '../../Core/functions/number';

function CuadroResumen({buy_active}){
    let {states:{buys}} = React.useContext(Context);
    let total_gastos = 0;
    if(buys[0][buy_active[1]].detail)
        buys[0][buy_active[1]].detail.map(line=>{total_gastos += line.total; return true;});
    
    return(
        <div className="mt-2 float-right w-9/12  text-right">
            <label className="font-bold">Total compra: </label><label className="px-2">{format_currency({val:total_gastos})}</label>
        </div>
    );
}

export {CuadroResumen}