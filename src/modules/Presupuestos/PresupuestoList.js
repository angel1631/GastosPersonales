import {format_currency} from "../../Core/functions/number";

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
    console.log("--------------presupuesto activo",presupuesto_activo);
    
    
    return (
        <div className="w-full p-2">
            <div className="w-full divide-y divide-stone-300 shadow-lg bg-slate-50">
                {
                    presupuesto.detail.map((line,index)=>(
                        <div className={`w-full flex text-center ${line.acumulado<0 && "bg-red-400 text-white"}`} key={line.id}>
                            <div className="w-2/12 px-1 ">{line.fecha}</div>
                            <div className="w-4/12 text-left px-1 ">{line.descripcion}</div>
                            
                            <div className={`w-2/12 px-1 ${(line.tipo=='gasto') && " text-red-700 "}`} >{line.tipo==='gasto' && "-"}{format_currency({val:line.monto})}</div>
                            <div className="w-2/12 px-1">{format_currency({val:line.acumulado})}</div>
                            <div className="w-1/12 px-1 ">
                                <div className="w-8 h-8 bg-blue-400 rounded-full" onClick={()=>{editar_item(index)}}><i className="text-blue-400 text-xl ri-edit-2-fill"></i></div>
                            </div>
                            <div className="w-1/12 px1 ">
                                <div className="w-8 h-8 bg-red-400 rounded-full" onClick={()=>delete_item(index)}><i className="text-red-400 text-xl ri-delete-bin-5-fill"></i></div>
                            </div>
                        </div>
                    ))
                }
                
            </div>
            
            <button className=" bg-emerald-300 w-full py-2 rounded-md text-white font-bold mt-2 " onClick={()=>state_show_form[1](true)}>Agregar movimiento</button>
        </div>
    );
}   
export {PresupuestoList}