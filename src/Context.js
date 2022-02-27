import React from "react";
import {useLocalStorage} from './hooks/useLocalStorage'


const Context = React.createContext();

function ContextProvider(props){
    let states = {};
    states.buys = useLocalStorage({nameItem: 'buys', defaultValue:[]});
    states.items = useLocalStorage({nameItem: 'items', defaultValue:[]});
    
    return (
        <Context.Provider value={{
            states
        }}>
          {props.children}
        </Context.Provider>
    );
}

export {Context, ContextProvider}