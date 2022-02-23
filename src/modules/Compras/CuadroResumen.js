import React from "react"
import { Context } from '../../Context';

function CuadroResumen({buy_active}){
    let {states:{buys}} = React.useContext(Context);
    let total_gastos = 0;
    if(buys[0][buy_active[1]].detail)
        buys[0][buy_active[1]].detail.map(line=>{total_gastos += line.total; return true;});
    return(
        <section>
            <label>Total de compra: </label><label>{total_gastos}</label>
        </section>
    );
}

export {CuadroResumen}