import React from 'react';

function GenericList({title, lineOnClick, state_show_form, state_list, fields_display}){
    
    let [list,setList] = state_list;
    let delete_buy = (index)=>{
        let c_list = [...list];
        c_list.splice(index,1);
        setList(c_list);
    }
    return(
        <div className='w-full flex flex-col px-2 relative h-full'>
            <div className='divide-y divide-stone-300 shadow-md flex flex-col '>
                {list.map((line,index)=>
                (<div className='w-full flex bg-slate-50' key={line.id}>
                    <div className='w-11/12 py-1 flex' onClick={()=>{if(lineOnClick)lineOnClick({line,index})}}>
                        {fields_display.map((field,index)=>
                            (<span className={"px-2 w-"+field.wid} key={index}>{line[field.col]}</span>)
                        )}
                    </div>
                    <div className="w-1/12 px1 align-middle">
                        <div className='w-5 h-5 rounded-full bg-red-400' onClick={()=>delete_buy(index)}><i className="text-red-400 text-xl ri-delete-bin-5-fill"></i></div>
                    </div>
                </div>
                ))}
            </div>
            <button className="bg-emerald-300 w-full py-2 rounded-md mt-3 text-white font-bold " onClick={()=>state_show_form[1](true)}>Agregar {title}</button>
        </div>
    );
}
export {GenericList}