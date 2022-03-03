import {format_currency} from "../../Core/functions/number";
import {FaArrowLeft, FaEdit, FaTrash} from "react-icons/fa";
import { ContainerList } from "../../Core/components/ContainerList";

function PresupuestoList({presupuesto_activo, form_state, state_show_form, headers=[], statePresupuestos}){
    let [form,setForm] = form_state;
    let [presupuestos, setPresupuestos] = statePresupuestos
    let presupuesto = presupuestos[presupuesto_activo[0][1]]
    
    if(presupuesto.detail.length>0 && headers.length===0)
        headers = Object.keys(presupuesto.detail[0]);
    
    let delete_item = (index)=>{
        let c_presupuestos = [...presupuestos];
        c_presupuestos[presupuesto_activo[0][1]].detail.splice(index,1);
        setPresupuestos(c_presupuestos);
    }
    let editar_item = (index)=>{
        state_show_form[1](true);
        let item = {...presupuesto.detail[index]};
        setForm(item);
    }
    return (
        <ContainerList title={presupuesto.title.toUpperCase()} onClickAdd={()=>state_show_form[1](true)} onClickBack={()=>presupuesto_activo[1]([0,-1])}>
            <div className="w-full divide-y divide-stone-300 shadow-lg bg-slate-50 ">
                {
                    presupuesto.detail.map((line,index)=>(
                        <div className={`py-2 w-full flex text-center ${line.acumulado<0 && "bg-red-400 text-white"}`} key={line.id}>
                            <div className="w-2/12 px-1 ">{line.fecha}</div>
                            <div className="w-4/12 text-left px-1 ">{line.descripcion}</div>
                            
                            <div className={`w-2/12 px-1 ${(line.ingreso==false) && " text-red-700 "}`} >{line.ingreso==false && "-"}{format_currency({val:line.monto})}</div>
                            <div className="w-2/12 px-1">{format_currency({val:line.acumulado})}</div>
                            <div className="w-1/12 px-1 " onClick={()=>{editar_item(index)}}>
                                <FaEdit className=" text-blue-400 text-xl" />
                            </div>
                            <div className="w-1/12 px1 " onClick={()=>delete_item(index)}>
                                <FaTrash className=" text-orange-700 text-xl"></FaTrash>
                            </div>
                        </div>
                    ))
                }
            </div>
        </ContainerList>
    );
}   
export {PresupuestoList}