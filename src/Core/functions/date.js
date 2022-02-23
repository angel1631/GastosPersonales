function getDateShort(date){
    date = new Date(date);
    return String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
}

export {getDateShort}