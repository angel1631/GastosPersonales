import React from "react"
import { FaLine } from "react-icons/fa";
import { AutoComplete } from "./AutoComplete";

function GenericForm({title="Formulario", children, fields, url_enviar, function_send, state_show_form, form_state}){
    
    let [form,setForm] = form_state;
    let change_input = ({e, id, value})=>{
        let new_value = {...form};
        
        new_value[id] = value; 
        setForm(new_value);
    }
    function send_form({e, url_enviar}){
        try{
            e.preventDefault();
            let new_item = {};
            fields.map((field)=>{
                if(!form[field.id] && field.required != false && field.type !='switch') throw `Error no se lleno el campo ${field.id}`;
                else {new_item[field.id] = form[field.id];}
                return true;
            });
            function_send(new_item);
            clear_form();
            
        }catch(error){
            alert(error);
            console.log("------------error", error);
        }
    }
    function clear_form(){
        let new_form = {};        
        fields.map((field)=>{
            new_form[field.id] = '';
            return true;
        });
        setForm(new_form);
        state_show_form[1](false);
    }
    
    return (
        <div className="w-full px-2 my-4">
            <form className=" px-2 bg-gray-200 rounded-lg shadow-lg divide-slate-400/25" onSubmit={(e)=>{send_form({e,url_enviar})}}>
                <div className="flex mb-4">
                    <div className="title_form justify-center w-full font-bold text-2xl py-2 ">{title}</div>
                    <div className="text-xl font-bold text-white bg-red-500 mt-2 w-8 h-8 rounded-full text-center relative float-left" onClick={()=>state_show_form[1](false)}>x</div>
                </div>
                {
                    fields.map(field=>(
                        <div className={(field.depende && form[field.depende]==false) && 'hidden' || 'form-line'} key={field.id}>
                            {field.type=='radio' && 
                                field.options.map((option,index)=>(
                                    <label key={index}>
                                        <input type="radio" name={field.id} value={option.value} 
                                            onChange={(e)=>change_input({e, id:field.id})}
                                        /> {option.show}
                                    </label>
                                ))
                            }
                            {field.type=='switch' &&
                                <div className="form-check form-switch pl-1 py-2 flex ">
                                    <label className=" text-gray-800" htmlFor="flexSwitchCheckDefault">{field.description}</label>
                                    <input className="form-check-input appearance-none w-9 ml-2 rounded-full h-5 
                                                        align-top bg-gray-400 bg-no-repeat bg-contain text-zinc-800 focus:outline-none cursor-pointer shadow-sm" 
                                            type="checkbox" checked={form[field.id]} role="switch" onChange={(e)=>change_input({e, id:field.id, value: e.target.checked})}/>
                                    
                                </div>
                            }
                            {(field.type!='radio' && field.type!='switch') &&
                                <input className="w-full rounded-lg shadow-md p-2 mb-2" placeholder={field.description} 
                                    style={field.invisible && {display: "none"}} 
                                    type={field.type} value={form[field.id]} 
                                    onBlur={(e)=>{
                                        if(field.onBlur)
                                        field.onBlur(e);
                                    }} 
                                    onChange={(e)=>change_input({e, id:field.id, value:e.target.value})} />
                            }
                            {field.autoComplete && <AutoComplete list={field.autoComplete} form_state={form_state} id={field.id}/>}
                        </div>
                    ))
                }
                {children}
                <button className="w-full my-4 bg-sky-400 py-2 rounded-lg shadow-lg font-bold" type="submit">Guardar</button>
                
            </form>
        </div>
    );
}

export {GenericForm}