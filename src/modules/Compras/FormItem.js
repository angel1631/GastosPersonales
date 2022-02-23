function FormItem(){
    
    return(
        <form onSubmit={(e)=>{send_form({e,url_enviar})}}>
            {
                fields.map(field=>(
                    <div className="form_line" key={field.id}>
                        <input placeholder={field.description} type={field.type} value={form[field.id]} onChange={(e)=>change_input({e, id:field.id, autoComplete:field.autoComplete})} />
                        {field.autoComplete && <AutoComplete list={field.autoComplete} form={form} set={setForm} id={field.id}/>}
                    </div>
                ))
            }
            <button type="submit">Enviar Formulario</button>
            {children}
        </form>
    );
}
export {FormItem}