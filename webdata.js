
var axios = require("axios");


// const getAuthorData = () =>{
//     let url = "https://archiveofourown.org/users/iluv2eat/pseuds/iluv2eat/works";

//     //let url = `https://archiveofourown.org/users/${user}/pseuds/iluv2eat/works`;

//     const res = axios.get(url);
    
//     return res;

// }





const getAuthorData = (user) =>{

    let url = `https://archiveofourown.org/users/${user}/pseuds/iluv2eat/works`;

    const res = axios.get(url);
    
    return res;
    
}

module.exports = getAuthorData;


