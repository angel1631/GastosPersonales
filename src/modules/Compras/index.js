import React from "react";
import { FormGeneric } from "../../Core/components/Form";

import { List } from "./List";
import { CuadroResumen } from "./CuadroResumen";
import { Context } from '../../Context';
import { BuyList } from "./BuyList";
import {ListPrev} from './ListPrev';

function Compras() {
  let {states} = React.useContext(Context);
  let fields = [];
  let item_searched = React.useState("");

  fields.push({id: 'id', description: 'id', type: 'text', orden: 1, required:false});
  fields.push({id: "producto", description:'Item', type: 'text', orden:1, autoComplete:states.items[0],onBlur: (e)=>{item_searched[1](e.target.value)}});
  fields.push({id: "cantidad", description:'Cantidad', type: 'number', orden:2});
  fields.push({id: "precio", description:'Precio', type: 'number', orden:3});
  
  let fields_buy = [{id: "title", description:'Nombre de la compra', type: 'text', orden:1}];
  let buy_active = React.useState([0,-1]);
  let borrar_data = ()=>{
    localStorage.clear();
  }
  let create_line_product = ({producto,cantidad,precio})=>{
    if(buy_active[0][0]===0) throw "Debe seleccionar una compra para poder agregar un item";
    if(cantidad<=0) throw "La cantidad ingresada no es valida";
    if(precio<=0) throw "El precio del producto no esta correcto";
    
    let buy = JSON.parse(JSON.stringify(states.buys[0]));
    if(buy[buy_active[0][1]].id != buy_active[0][0]) throw "Error grave refrescar la pagina";
    buy[buy_active[0][1]].detail.push({producto,cantidad,precio, total: parseInt((cantidad*precio).toFixed(2))});
    states.buys[1](buy);
    
    if(states.items[0].indexOf(producto)<0){
      states.items[1]([...states.items[0], producto]);
    }
  }
  let create_buy = ({title})=>{
    if(title=="") throw "El campo titulo no es valido";
    let id = Math.floor(Math.random() * 10000);
    let createdAt = new Date();
    states.buys[1]([...states.buys[0],{title,id, createdAt,detail:[]}]);
  }
  
  
  return (
      <React.Fragment>
        <div className="App">
          <label>id: {buy_active[0][0]}, p: {buy_active[0][1]}</label>
          <FormGeneric fields={fields_buy} function_send={create_buy}/>
          <BuyList buy_active={buy_active}/>
          <FormGeneric fields={fields} function_send={create_line_product}>
            <ListPrev item_searched={item_searched[0]} />
          </FormGeneric>
          {buy_active[0][0]!=0 && <CuadroResumen buy_active={buy_active[0]}/>}
          {buy_active[0][0]!=0 && <List buy_active={buy_active[0]}/>}
          
        </div>
        <button onClick={borrar_data}>Borrar data </button>
      </React.Fragment>
  );
}
export default Compras;