function format_currency({val}){
    const format_number = new Intl.NumberFormat("en-GB", {minimumFractionDigits: 2});
    return format_number.format(val);
}

export {format_currency}