import React from "react"
import { GenericList } from "../../Core/components/GenericList";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import {GenericForm} from '../../Core/components/GenericForm'
import {getDateShort} from '../../Core/functions/date';
import { PresupuestoList } from "./PresupuestoList";


function Presupuestos (){
    let presupuesto_activo = React.useState([0,-1]);
    let show_form_presupuesto = React.useState(false);
    let form_presupuesto = React.useState({title:'', id:'',createdAt:'',detail:''});
    let state_presupuestos = useLocalStorage({nameItem: 'presupuestos', defaultValue:[]});
    
    let fields_presupuesto = [{id: 'id', description: 'identificador del presupuesto', type:"number", invisible:true, required:false},
                             {id: 'title', description: 'Nombre del presupuesto', type: 'text'},
                             {id: 'createdAt', description: 'Fecha de ingreso', type:"date", required:false}];



    let show_form_movimiento = React.useState(false);
    let form_movimiento = React.useState({id:'', descripcion: '', monto:'', ingreso:true, fecha:'', frecuencia: '', repeticiones: '', periodico: false});
    
    let fields_movimiento = [];
    fields_movimiento.push({id: 'id', description: 'Id del movimiento', type:'number', required:false, invisible:true});
    fields_movimiento.push({id: 'fecha', description: 'Fecha de referencia', type:'date'})
    fields_movimiento.push({id: 'descripcion', description: 'Descripcion del movimiento', type:'text'});
    fields_movimiento.push({id: 'monto', description: 'Monto del movimiento', type:'number'});
    fields_movimiento.push({id: 'ingreso', description: 'Es un ingreso', type:'switch'});
    fields_movimiento.push({id: 'periodico', description: 'Desea repetir este movimiento varias veces', type: 'switch'});
    fields_movimiento.push({id: 'repeticiones', description: 'Cuantas veces desea repetir el movimiento:', type:'number', required: false, depende: 'periodico'});
    fields_movimiento.push({id: 'frecuencia', description: 'Cada cuantos días desea repetir el movimiento:', type:'number', required: false, depende: 'periodico'});
    
    let guardar_presupuesto = async ({id, title, createdAt, inicio})=>{
        let new_presupuesto = {id,title,createdAt};

        let actualizar = false;
        if(!!id){actualizar = true;}
        if(actualizar){
            let bc_presupuestos = [...state_presupuestos[0]];
            bc_presupuestos.map((item,index)=>{
                if(item.id==id){
                    new_presupuesto.detail = bc_presupuestos[index].detail;
                    bc_presupuestos[index] = new_presupuesto;
                } 
            });
            state_presupuestos[1](bc_presupuestos);
        }else{
            new_presupuesto.id = Math.floor(Math.random() * 10000);
            if(!createdAt)
                new_presupuesto.createdAt = getDateShort(new Date()); 
            new_presupuesto.detail = [];
            state_presupuestos[1]([...state_presupuestos[0], new_presupuesto]);
            presupuesto_activo[1]([new_presupuesto.id, (state_presupuestos[0].length)]);
        }
    }

    let guardar_movimiento = ({id, descripcion, monto, fecha,frecuencia, ingreso, repeticiones})=>{
        if(monto<=0) throw "Los movimientos solo pueden tener montos mayores a 0";
        let presupuestos = [...state_presupuestos[0]];
        if(presupuestos[presupuesto_activo[0][1]].id != presupuesto_activo[0][0]) throw "Error grave el id seleccionado no es igual al almacenado, refrescar la pagina";
        let new_movimientos = [];
        
        let actualizar = false;
        if(!!id){actualizar = true;}
        new_movimientos.push({id,descripcion,monto,ingreso,fecha: getDateShort(fecha)});
        if(actualizar){
            presupuestos[presupuesto_activo[0][1]].detail.map((item,index)=>{
                if(item.id==id){
                    presupuestos[presupuesto_activo[0][1]].detail[index] = new_movimientos[0];
                } 
            });
            state_presupuestos[1](presupuestos);
        }else{
            new_movimientos[0].id = parseInt(Math.random() * 10000000);
            if(frecuencia>1){
                fecha = new Date(fecha+"T00:00:00");
                for(var x = 0; x < repeticiones; x++){
                    id = parseInt(Math.random() * 10000000);
                    fecha = fecha.getTime();
                    fecha = fecha+(86400*frecuencia*1000);
                    fecha = new Date(fecha);
                    new_movimientos.push({id,descripcion,monto,ingreso,fecha: getDateShort(fecha)});
                }    
            }
            presupuestos[presupuesto_activo[0][1]].detail = [...presupuestos[presupuesto_activo[0][1]].detail, ...new_movimientos];
            state_presupuestos[1](presupuestos);
            
        }
        ordenar_movimientos({state_presupuestos, presupuesto_activo});
        calcular_acumulado({state_presupuestos, presupuesto_activo});
    }


    return (
        <div className="w-full">
            {presupuesto_activo[0][0]===0 && 
                <div className="w-full">
                    {show_form_presupuesto[0] && 
                        <GenericForm title="Nueva proyeccion"
                                    fields={fields_presupuesto} 
                                    function_send={guardar_presupuesto}
                                    state_show_form={show_form_presupuesto} 
                                    form_state={form_presupuesto}/>
                    }
                    {!show_form_presupuesto[0] &&
                        <GenericList title="Listado de Presupuestos" 
                        lineOnClick={({line,index})=>{presupuesto_activo[1]([line.id,index])}} 
                        state_show_form={show_form_presupuesto}
                        state_list={state_presupuestos}
                        fields_display={[{col: 'title', wid: '3/4'},{col:'createdAt', wid:'1/4'}]} 
                        state_form={form_presupuesto}/>
                    }
                </div>
            }
            {presupuesto_activo[0][0]!==0 && 
                <div className="w-full">
                    
                    {show_form_movimiento[0] &&
                        <GenericForm title="Movimientos"
                            fields={fields_movimiento} 
                            function_send={guardar_movimiento}
                            state_show_form={show_form_movimiento} 
                            form_state={form_movimiento}/>
                    }
                    {!show_form_movimiento[0] &&
                        <PresupuestoList presupuesto_activo={presupuesto_activo}
                        form_state={form_movimiento}
                        state_show_form={show_form_movimiento}
                        headers={[]}
                        statePresupuestos={state_presupuestos}/>
                    }
                </div>
            }
            
        </div>
    );
}

function ordenar_movimientos({state_presupuestos, presupuesto_activo}){
    let t_presupuestos = [...state_presupuestos[0]];
    t_presupuestos[presupuesto_activo[0][1]].detail.sort((a,b)=>{
        let t1 = new Date(a.fecha);
        let t2 = new Date(b.fecha);
        if(t1>t2) return 1;
        if(t1<t2) return -1;
        return 0;
    });
    state_presupuestos[1](t_presupuestos);
}
function calcular_acumulado({state_presupuestos, presupuesto_activo}){
    let t_presupuestos = [...state_presupuestos[0]];
    let t_detail = t_presupuestos[presupuesto_activo[0][1]].detail;
    t_detail.map((el,index)=>{
        let tipo = 1;
        if(!el.ingreso) tipo = -1;
        if(index==0) t_detail[index].acumulado = (el.monto*tipo);
        else t_detail[index].acumulado = (t_detail[(index-1)].acumulado)+(el.monto*tipo);
    });
    state_presupuestos[1](t_presupuestos);
} 

export {Presupuestos}