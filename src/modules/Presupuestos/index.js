import React from "react"
import { GenericList } from "../../Core/components/GenericList";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import {GenericForm} from '../../Core/components/GenericForm'
import {getDateShort} from '../../Core/functions/date';
import { PresupuestoList } from "./PresupuestoList";


function Presupuestos (){
    let presupuesto_activo = React.useState([0,-1]);
    let show_form_presupuesto = React.useState(false);
    let form_presupuesto = React.useState({title:'', inicio:''});
    let state_presupuestos = useLocalStorage({nameItem: 'presupuestos', defaultValue:[]});
    
    let fields_presupuesto = [{id: 'title', description: 'Nombre del presupuesto', type: 'text'}, 
                            {id: 'inicio', description: 'Con cuanto dinero iniciara la proyeccion', type: 'number'}];



    let show_form_movimiento = React.useState(false);
    let form_movimiento = React.useState({id:'', descripcion: '', monto:'', tipo:'', fecha:'', frecuencia: ''});
    
    let fields_movimiento = [];
    fields_movimiento.push({id: 'id', description: 'Id del movimiento', type:'number', required:false, invisible:true});
    fields_movimiento.push({id: 'fecha', descripcion: 'Fecha de referencia', type:'date'})
    fields_movimiento.push({id: 'descripcion', description: 'Descripcion del movimiento', type:'text'});
    fields_movimiento.push({id: 'monto', description: 'Monto del movimiento', type:'number'});
    fields_movimiento.push({id: 'tipo', options: [{show: 'Ingreso', value: 'ingreso'},{show: 'Gasto', value: 'gasto'}], type:'radio'});
    fields_movimiento.push({id: 'frecuencia', description: 'Cada cuantos días desea repetir el movimiento:', type:'number', required: false});
    
    let guardar_presupuesto = async ({title, inicio})=>{
        let new_presupuesto = {title};
        new_presupuesto.id = Math.floor(Math.random() * 10000);
        new_presupuesto.createdAt = getDateShort(new Date()); 
        new_presupuesto.detail = [];
        if(!!inicio)
            new_presupuesto.detail.push({id: '', description: 'Monto inicial de la proyeccion', monto:inicio, tipo:'ingreso', fecha: new_presupuesto.createdAt, frecuencia:''});
        let b_presupuestos = [...state_presupuestos[0]];
        b_presupuestos.push(new_presupuesto);
        await state_presupuestos[1](b_presupuestos, ()=>{
            console.log('-------------state presupuestros', state_presupuestos[0]);
        });
        
        let new_activo = [new_presupuesto.id, (state_presupuestos[0].length)];
        presupuesto_activo[1](new_activo);
    }

    let guardar_movimiento = ({id, descripcion, monto, tipo, fecha,frecuencia})=>{
        if(monto<=0) throw "Los movimientos solo pueden tener montos mayores a 0";
        console.log('---------------presuuesto 2', presupuesto_activo[0]);
        let presupuestos = [...state_presupuestos[0]];
        if(presupuestos[presupuesto_activo[0][1]].id != presupuesto_activo[0][0]) throw "Error grave el id seleccionado no es igual al almacenado, refrescar la pagina";
        let new_movimientos = [];
        
        let actualizar = false;
        if(!!id){actualizar = true;}
        new_movimientos.push({id,descripcion,monto,tipo,fecha});
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
                fecha = new Date(fecha);
                for(var x = 0; x < 12; x++){
                    id = parseInt(Math.random() * 10000000);
                    fecha.setDate(fecha.getDate() + frecuencia);
                    
                    new_movimientos.push({id,descripcion,monto,tipo,fecha: getDateShort(fecha)});
                }    
            }
            presupuestos[presupuesto_activo[0][1]].detail = [...presupuestos[presupuesto_activo[0][1]].detail, ...new_movimientos];
            state_presupuestos[1](presupuestos);
            console.log('-----------state despues de gua', state_presupuestos[0]);
        }
        ordenar_movimientos({state_presupuestos, presupuesto_activo});
        calcular_acumulado({state_presupuestos, presupuesto_activo});
    }
    
    React.useEffect(()=>{
        if(presupuesto_activo[0][0]!==0){
            
        }
    }, [state_presupuestos[0]])


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
                    <GenericList title="Proyeccion de Presupuestos" 
                        lineOnClick={({line,index})=>{presupuesto_activo[1]([line.id,index])}} 
                        state_show_form={show_form_presupuesto}
                        state_list={state_presupuestos}
                        fields_display={[{col: 'title', wid: 'full'}]} />
                </div>
            }
            {presupuesto_activo[0][0]!==0 && 
                <div className="w-full">
                    <div onClick={()=>presupuesto_activo[1]([0,-1])} className="ml-2 px-2 w-8 h-8 pt-1 bg-slate-500 rounded-full text-center align-middle">
                        <i  className="text-white font-bold ri-arrow-go-back-line"></i>
                    </div>
                    {show_form_movimiento[0] &&
                        <GenericForm title="Movimientos"
                            fields={fields_movimiento} 
                            function_send={guardar_movimiento}
                            state_show_form={show_form_movimiento} 
                            form_state={form_movimiento}/>
                    }
                    <PresupuestoList presupuesto_activo={presupuesto_activo}
                                     form_state={form_movimiento}
                                     state_show_form={show_form_movimiento}
                                     headers={[]}
                                     statePresupuestos={state_presupuestos}/>
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
    console.log("---------presupuesto_activo ", presupuesto_activo[0]);
    console.log("-------------- state_presupuestos", state_presupuestos[0]);
    let t_presupuestos = [...state_presupuestos[0]];
    let t_detail = t_presupuestos[presupuesto_activo[0][1]].detail;
    t_detail.map((el,index)=>{
        let tipo = 1;
        if(el.tipo=='gasto') tipo = -1;
        if(index==0) t_detail[index].acumulado = (el.monto*tipo);
        else t_detail[index].acumulado = (t_detail[(index-1)].acumulado)+(el.monto*tipo);
    });
    state_presupuestos[1](t_presupuestos);
    console.log("-----------------state cc",state_presupuestos[0]);
} 

export {Presupuestos}