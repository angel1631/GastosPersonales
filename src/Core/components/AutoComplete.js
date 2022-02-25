import React from "react";
function AutoComplete({list, form_state, id}){
    let [form,setForm] = form_state;
    
    let visible_ac = React.useState(true);
    let list_searched = [];
    let value = form[id];
    if(value.length>3)
        list_searched = list.filter(item=> (item.toLowerCase()).includes(value.toLowerCase()));
    if(list_searched.length===1 && list_searched[0]===value) list_searched = [];
    let seleccionar = (item)=>{
        let new_form = {...form};
        new_form[id] = item;
        setForm(new_form);
        visible_ac[1](false);
    }
    React.useEffect(()=>{
            visible_ac[1](true);
    }, [value])
    list_searched = list_searched.slice(0,5);
    return(
        <div className="w-full flex flex-col">
            {visible_ac[0] && list_searched.map((item,index)=>{
                return(<span className="w-full" onClick={()=>{seleccionar(item)}} key={index}>{item}</span>)
            })}
        </div>
    );
}
export {AutoComplete};