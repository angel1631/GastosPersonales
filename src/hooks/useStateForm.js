import {useState} from 'react';
function useStateForm({fields}){
    let array_fields = {};
    fields.map(field=>{
        let id = field.id;
        let def = '';
        if(field.def) def = field.def;
        array_fields[id]= def;
    });
    let [state, setState] = useState(array_fields);
    return [state, setState];
}

export {useStateForm}