import React from "react";
import { FormGeneric } from "../../Core/components/Form";

import { List } from "./List";
import { Context } from '../../Context';
import { BuyList } from "./BuyList";
import {ListPrev} from './ListPrev';

function Compras() {
  let {states} = React.useContext(Context);
  let fields = [];
  let item_searched = React.useState("");

  fields.push({id: 'id', description: 'id', type: 'text', orden: 1, required:false, invisible:true});
  fields.push({id: "producto", description:'Item', type: 'text', orden:1, autoComplete:states.items[0],onBlur: (e)=>{item_searched[1](e.target.value)}});
  fields.push({id: "cantidad", description:'Cantidad', type: 'number', orden:2});
  fields.push({id: "precio", description:'Precio', type: 'number', orden:3});
  
  let fields_buy = [{id: "title", description:'Nombre de la compra', type: 'text', orden:1}];
  let buy_active = React.useState([0,-1]);
  let form_buy_visible = React.useState(false);
  let form_item_visible = React.useState(false);
  let form_buy = React.useState({title:''});
  let form_item = React.useState({id:'',producto:'',cantidad:'',precio:''});
  let borrar_data = ()=>{
    localStorage.clear();
  }
  let create_line_product = ({id,producto,cantidad,precio})=>{
    if(buy_active[0][0]===0) throw "Debe seleccionar una compra para poder agregar un item";
    if(cantidad<=0) throw "La cantidad ingresada no es valida";
    if(precio<=0) throw "El precio del producto no esta correcto";
    
    let buys = JSON.parse(JSON.stringify(states.buys[0]));
    if(buys[buy_active[0][1]].id != buy_active[0][0]) throw "Error grave refrescar la pagina";
    let new_item = {producto,cantidad,precio, total: parseInt((cantidad*precio).toFixed(2))};
    if(parseInt(id)>0){
      console.log("----------------reconocio id",id);
      buys[buy_active[0][1]].detail.map((item,index)=>{
        if(item.id==id){
          buys[buy_active[0][1]].detail[index] = new_item;
        } 
      });
      states.buys[1](buys);
    }else{
      new_item.id = parseInt(Math.random() * 1000000);
      buys[buy_active[0][1]].detail.push(new_item);
      states.buys[1](buys);
    }
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
      <div className="w-full h-full">
          {form_buy_visible[0] && buy_active[0][0]===0 && <FormGeneric title="Agregar Compras" form_state={form_buy} fields={fields_buy} function_send={create_buy} form_visible={form_buy_visible[1]}/>}
         
          {buy_active[0][0]===0 && <BuyList buy_active={buy_active} form_buy_visible={form_buy_visible[1]}/>}
          
          {buy_active[0][0]!==0 && 
            <div className="w-full">
              <div className="ml-2 px-2 w-8 h-8 pt-1 bg-slate-500 rounded-full text-center align-middle">
                <i onClick={()=>buy_active[1]([0,-1])} className="text-white font-bold ri-arrow-go-back-line"></i>
              </div>
              
              {form_item_visible[0] && <FormGeneric title="Agregar Items" form_state={form_item} fields={fields} function_send={create_line_product} form_visible={form_item_visible[1]}>
                                        <ListPrev item_searched={form_item[0].producto} />
                                      </FormGeneric>}
              
              
              <List headers={["producto","cantidad","precio","total"]} buy_active={buy_active[0]} form_state={form_item} form_item_visible={form_item_visible[1]}/>
            </div>
          }
        
      </div>
  );
}
export default Compras;