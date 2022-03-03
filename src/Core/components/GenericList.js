import React from 'react';
import { FaTrash } from 'react-icons/fa';
import {ContainerList} from './ContainerList';
import {ordenar_list} from '../functions/list';

function GenericList({title, lineOnClick, state_show_form, state_list, fields_display, children, order}){
    
    let [list,setList] = state_list;
    let delete_buy = (index)=>{
        let c_list = [...list];
        c_list.splice(index,1);
        setList(c_list);
    }
    let lista_ordenada = [...list];
    if(order){
        let {by, asc=true, type} = order;
        lista_ordenada = ordenar_list({list: lista_ordenada, by, asc, type});
    }
    return(
        <ContainerList title={title} onClickAdd={()=>state_show_form[1](true)} >
            <div className='divide-y divide-stone-300 shadow-md flex flex-col mt-4'>
                {lista_ordenada.map((line,index)=>
                (<div className='w-full flex bg-slate-50 py-1' key={line.id}>
                    <div className='w-11/12 py-1 flex' onClick={()=>{if(lineOnClick)lineOnClick({line,index})}}>
                        {fields_display.map((field,index)=>
                            (<span className={"px-2 w-"+field.wid} key={index}>{line[field.col]}</span>)
                        )}
                    </div>
                    <div className="w-1/12 px-1 py-2" onClick={()=>delete_buy(index)}>
                        <FaTrash className='text-red-400 ' />
                    </div>
                </div>
                ))}
            </div>
            {children}
        </ContainerList>
    );
}
export {GenericList}