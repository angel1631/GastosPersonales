import React from "react";
import { GenericForm } from "../../Core/components/GenericForm";

import { List } from "./List";
import { Context } from '../../Context';

import {ListPrev} from './ListPrev';
import { GenericList } from "../../Core/components/GenericList";
import {getDateShort} from '../../Core/functions/date';

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
    let createdAt = getDateShort(new Date());

    states.buys[1]([...states.buys[0],{title,id, createdAt,detail:[]}]);
  }
  
  
  return (
      <div className="w-full h-full">
          {form_buy_visible[0] && buy_active[0][0]===0 && <GenericForm title="Agregar Compras" form_state={form_buy} fields={fields_buy} function_send={create_buy} state_show_form={form_buy_visible[1]}/>}
         
          {buy_active[0][0]===0 && <GenericList 
                                      title="Compras" 
                                      lineOnClick={({line,index})=>{buy_active[1]([line.id, index])}}
                                      state_show_form={form_buy_visible}
                                      state_list={states.buys}
                                      fields_display={[{col:"title", wid:'1/2'}, {col: "createdAt", wid: '1/2'}]} />}
          
          {buy_active[0][0]!==0 && 
            <div className="w-full">
              <div onClick={()=>buy_active[1]([0,-1])} className="ml-2 px-2 w-8 h-8 pt-1 bg-slate-500 rounded-full text-center align-middle">
                <i  className="text-white font-bold ri-arrow-go-back-line"></i>
              </div>
              
              {form_item_visible[0] && <GenericForm title="Agregar Items" form_state={form_item} fields={fields} function_send={create_line_product} state_show_form={form_item_visible[1]}>
                                        <ListPrev item_searched={form_item[0].producto} />
                                      </GenericForm>}
              
              
              <List headers={["producto","cantidad","precio","total"]} buy_active={buy_active[0]} form_state={form_item} form_item_visible={form_item_visible[1]}/>
            </div>
          }
        
      </div>
  );
}
export default Compras;