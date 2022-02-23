import React from "react"
import { AutoComplete } from "./AutoComplete";

function FormGeneric({children,fields, url_enviar,function_send}){
    
    let stateFields = {};
    fields.map((field)=>stateFields[field.id]='');
    let [form, setForm] = React.useState(stateFields); 

    let change_input = ({e, id, autoComplete})=>{
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
        fields.map((field)=>{
            form[field.id] = '';
            return true;
        });
    }
    
    return (
        <form onSubmit={(e)=>{send_form({e,url_enviar})}}>
            {
                fields.map(field=>(
                    <div className="form_line" key={field.id}>
                        <input placeholder={field.description} type={field.type} value={form[field.id]} onBlur={field.onBlur} onChange={(e)=>change_input({e, id:field.id, autoComplete:field.autoComplete})} />
                        {field.autoComplete && <AutoComplete list={field.autoComplete} form={form} set={setForm} id={field.id}/>}
                    </div>
                ))
            }
            <button type="submit">Enviar Formulario</button>
            {children}
        </form>
    );
}

export {FormGeneric}