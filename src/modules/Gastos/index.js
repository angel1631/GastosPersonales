import {useLocalStorage} from '../../hooks/useLocalStorage';
import {GenericForm} from '../../Core/components/GenericForm';
import {useState} from 'react';
import {useStateForm} from '../../hooks/useStateForm';
import {getDateShort} from '../../Core/functions/date';
import { GenericList } from '../../Core/components/GenericList';
import { Resumen } from './Resumen';
import { format_currency } from '../../Core/functions/number';

function Gastos(){

    let fields_gasto = [{id: 'id', description: 'identificador del gasto', type: 'number', required: false, invisible: true},
                        {id: 'descripcion', description: 'Describir el gasto realizado', type:'text'},
                        {id: 'monto', description: 'Monto del gasto', type: 'number'},
                        {id: 'createdAt', description: 'Fecha del gasto', type: 'date', required: false}];
    
    let states = {};
    states.gastos = useLocalStorage({nameItem: 'gastos', defaultValue: []});
    states.show_form_gasto = useState(false);
    states.form_gasto = useStateForm({fields: fields_gasto});

    return(
        <div className='w-full'>
            {states.show_form_gasto[0] && 
                <GenericForm title="Gasto" fields={fields_gasto} 
                    function_send={(new_item)=>guardar_gasto({item: new_item, state_save: states.gastos, show_form: states.show_form_gasto})} 
                    state_show_form={states.show_form_gasto} form_state={states.form_gasto} />
            }
            {!states.show_form_gasto[0] &&
                <div>
                
                <GenericList title="Listado de gastos" 
                            state_show_form={states.show_form_gasto} 
                            state_list={states.gastos} 
                            fields_display={[{col: 'createdAt', wid:'1/4'},{col: 'descripcion', wid: '2/4'},{col:'monto', wid:'1/4'}]}
                            order={{by: 'createdAt', type: 'date', asc: false}}>
                </GenericList>
                <Resumen list={states.gastos}/>
                </div>
            }
            
        </div>
        
    );
}
export {Gastos};

function guardar_gasto({item, state_save, show_form}){
    let new_item = {...item};
    new_item.id = Math.floor(Math.random() * 10000);
    new_item.monto = format_currency({val:new_item.monto});
    if(!new_item.createdAt) new_item.createdAt=getDateShort(new Date()); 
    state_save[1]([...state_save[0], new_item]);   
    show_form[1](false);
}
