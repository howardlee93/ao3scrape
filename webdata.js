
var axios = require("axios");

const getAuthorData = (user) =>{

    let url = `https://archiveofourown.org/users/${user}/pseuds/${user}/works`;

    const res = axios.get(url);
    
    return res;
    
}

module.exports = getAuthorData;


