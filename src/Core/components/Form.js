import React from "react"
import { AutoComplete } from "./AutoComplete";

function FormGeneric({title="Formulario", children, fields, url_enviar, function_send, form_visible, form_state}){
    
    let [form,setForm] = form_state;
    let change_input = ({e, id})=>{
        let new_value = {...form};
        new_value[id] = e.target.value;
        setForm(new_value);
    }
    function send_form({e, url_enviar}){
        try{
            e.preventDefault();
            let new_item = {};
            fields.map((field)=>{
                if(!form[field.id] && field.required != false) throw `Error no se lleno el campo ${field.id}`;
                else {new_item[field.id] = form[field.id];}
                return true;
            });
            function_send(new_item);
            clear_form();
        }catch(error){
            alert(error);
        }
    }
    function clear_form(){
        let new_form = {};        
        fields.map((field)=>{
            new_form[field.id] = '';
            return true;
        });
        setForm(new_form);
        form_visible(false);
    }
    
    return (
        <div className="w-full px-2 my-4">
            <form className=" px-2 bg-gray-200 rounded-lg shadow-lg divide-slate-400/25" onSubmit={(e)=>{send_form({e,url_enviar})}}>
                <div className="flex mb-4">
                    <div className="title_form justify-center w-full font-bold text-2xl py-2 ">{title}</div>
                    <div className="text-xl font-bold text-white bg-red-500 mt-2 w-8 h-8 rounded-full text-center relative float-left" onClick={()=>form_visible(false)}>x</div>
                </div>
                {
                    fields.map(field=>(
                        <div className="form_line" key={field.id}>
                            <input className="w-full rounded-lg shadow-md p-2 mb-2" placeholder={field.description} 
                                style={field.invisible && {display: "none"}} 
                                type={field.type} value={form[field.id]} 
                                onBlur={(e)=>{
                                    if(field.onBlur)
                                    field.onBlur(e);
                                }} 
                                onChange={(e)=>change_input({e, id:field.id})} />
                            {field.autoComplete && <AutoComplete list={field.autoComplete} form_state={form_state} id={field.id}/>}
                        </div>
                    ))
                }
                {children}
                <button className="w-full my-4 bg-sky-400 py-2 rounded-lg shadow-lg font-bold" type="submit">Enviar</button>
                
            </form>
        </div>
    );
}

export {FormGeneric}