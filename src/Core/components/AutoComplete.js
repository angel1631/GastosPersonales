function AutoComplete({list, set, form, id}){
    let list_searched = [];
    let value = form[id];
    if(value.length>3)
        list_searched = list.filter(item=> (item.toLowerCase()).includes(value.toLowerCase()));
    if(list_searched.length===1 && list_searched[0]===value) list_searched = [];
    let seleccionar = (item)=>{
        let new_form = {...form};
        new_form[id] = item;
        set(new_form);
    }
    return(
        <ul>
            {list_searched.map((item,index)=>{
                
                return(<li onClick={()=>{seleccionar(item)}} key={index}>{item}</li>)
            })}
        </ul>
    );
}
export {AutoComplete};