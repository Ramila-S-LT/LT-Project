const cds = require('@sap/cds');
const axios = require('axios');
 
module.exports = cds.service.impl(async function () {
 
    this.on('getdata', async (req) => {
 
        const URL = "https://93a68e58trial-dev-autoscalerapplication-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/api/Products";
 
        async function loop() {
            while (true) {
            try {
                const data = await axios.get(URL);
                console.log("API hit...");
                //console.log(data);
                //return data;
               
            } catch (e) {
                console.log("Error:", e.message);
            }
 
            //await new Promise(r => setTimeout(r, 200));
            }
        }
 
        loop();
       
    })
 
 
});