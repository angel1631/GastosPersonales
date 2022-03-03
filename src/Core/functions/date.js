function getDateShort(date){
    if(typeof(date)=='string'){
        if(date.length<11) date = date+"T00:00:00";
        date = new Date(date);
    }
    let out = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return out; 
    
}

export {getDateShort}