
const dateFormat = ()=>{

    const date = new Date();

    const f_option={
        year: "numeric",
        month: "long",
        day: "numeric",
    }

    return(date.toLocaleDateString("en-GB", f_option));

}

module.exports.dateFormat = dateFormat;