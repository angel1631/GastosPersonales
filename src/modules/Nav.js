import logo from '../media/logo.png';
import {TiThMenu} from 'react-icons/ti';
import React from 'react';
import {Link} from 'react-router-dom';
import {RiShoppingBag3Line} from 'react-icons/ri';
import {FaFileInvoiceDollar} from 'react-icons/fa';
import {GiPayMoney} from 'react-icons/gi';
import {GoHome} from 'react-icons/go';
function Nav({title, menu_active}){
    return (
        <nav className="w-full h-14 bg-white flex p-4 justify-between fixed shadow-lg z-10">
            <TiThMenu onClick={()=>menu_active[1](!menu_active[0])} className={` h-auto text-2xl md:hidden`}></TiThMenu>
            <div className={`${menu_active[0] && 'hidden'} h-auto w-auto text-center items-center  flex space-x-4`}>
                <Link className="nav-link " to="/">
                    <img className=" h-14 max-w-full " src={logo} alt="" />
                </Link>
                <p className="text-xl text-slate-600 font-bold">{title}</p>
            </div>
            <div onClick={()=>menu_active[1](false)} className={` ${menu_active[0]==false && 'hidden'} flex space-x-4 bg-white `}>
                <Link className="nav-link flex space-x-2 text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" to="/">
                    <GoHome className=' text-blue-400 mt-1' />
                    <label>Home</label>
                </Link>
                <Link className="nav-link flex space-x-2 text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" to="/Presupuestos">
                    <FaFileInvoiceDollar className=' text-blue-400 mt-1' />
                    <label>Presupuestos</label>
                </Link>
                <Link className="nav-link flex space-x-2  text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" to="/Compras">
                    <RiShoppingBag3Line className=' text-blue-400 mt-1'/>
                    <label>Compras</label></Link>
                <Link className="nav-link flex space-x-2  text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" to="/Gastos">
                    <GiPayMoney className=' text-blue-400 mt-1'/>
                    <label>Gastos</label>
                </Link>
            </div>
            <div></div>
        </nav>
    );
}
export {Nav}