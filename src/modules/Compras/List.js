import React from "react"
import { Context } from '../../Context';

function List({buy_active}){
    
    let {states:{buys}} = React.useContext(Context);
    let buy = buys[0][buy_active[1]]; 
    let headers = [];
    if(buy.detail.length>0)
        headers = Object.keys(buy.detail[0]);
    
    let delete_item = (index)=>{
        let c_buys = JSON.parse(JSON.stringify(buys[0]));
        c_buys[buy_active[1]].detail.splice(index,1);
        buys[1](c_buys);
    }
    let editar_item = (index)=>{
        
    }

    return (
        <section>
            <table>
                <tbody>
                <tr>
                {
                    headers.map(header=>(
                        <th key={Math.floor(Math.random() * 10000)}>{header}</th>
                    ))
                }
                </tr>
                {
                    buy.detail.map((line,index)=>(
                        <tr key={Math.floor(Math.random() * 10000)}>
                            {
                                headers.map(header=>(
                                    <td key={Math.floor(Math.random() * 10000)}>{line[header]}</td>
                                ))
                            }
                            <td><button onClick={()=>delete_item(index)}>eliminar</button></td>
                            <td><button onClick={()=>editar_item(index)}>editar</button></td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </section>
    );
}
export {List}