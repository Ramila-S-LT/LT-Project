const axios = require("axios")

setInterval(() => {
    for(let i = 0; i < 50; i++){
        axios.get(`https://93a68e58trial-dev-securityxsuaa-srv.cfapps.us10-001.hana.ondemand.com/Products`).catch( 
            () => {});
    }
}, 100);




