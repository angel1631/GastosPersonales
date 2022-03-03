
import {FaArrowLeft} from "react-icons/fa";
import {IoAddCircle} from "react-icons/io5";
function ContainerList({children, title, onClickAdd, onClickBack}){
    return(
        <div className='w-full flex flex-col px-2 h-full'>
            <div className="w-full py-2 bg-cyan-200   mb-2 shadow-lg flex">
                {onClickBack && 
                    <div className="float-left relative pt-1 pl-2 " onClick={onClickBack} >
                        <FaArrowLeft className=" text-gray-800 text-xl"/>
                    </div>
                }
                <div className="w-full text-center font-bold text-lg text-gray-800">{title}</div>
            </div>
            {children}
            <button className="shadow hover:shadow-xl rounded-full fixed right-4 bottom-4" onClick={onClickAdd}>
                <IoAddCircle className="text-emerald-300 text-6xl"></IoAddCircle>
            </button>
        </div>
    )
}

export {ContainerList}