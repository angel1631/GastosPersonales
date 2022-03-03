function ordenar_list({list, by, asc, type}){
    let t_list = [...list];
    t_list.sort((a,b)=>{
        let t1 = a[by];
        let t2 = b[by];
        if(type === 'date'){
            t1 = new Date(t1);
            t2 = new Date(t2);
        }
        if(asc){
            if(t1>t2)return 1
            if(t1<t2)return -1
            return 0;
        }else{
            if(t1<t2) return 1;
            if(t1>t2) return -1;
            return 0;
        }
        
    });
    return t_list;
}

export {ordenar_list};