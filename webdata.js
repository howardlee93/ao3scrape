
var axios = require("axios");

const getAuthorData = (user) =>{

    let url = `https://archiveofourown.org/users/${user}/pseuds/iluv2eat/works`;

    const res = axios.get(url);
    
    return res;
    
}

module.exports = getAuthorData;


