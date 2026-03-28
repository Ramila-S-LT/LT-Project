const cds = require("@sap/cds");

module.exports = cds.service.impl(async function() {

    const conn = await cds.connect.to("MAPAPI");


    this.before("getMapDetails", (req)=>{

        if(!req.data.pincode){
            console.log("Pincode is Mandatory");
        }



    })

    this.on("getMapDetails", async (req) => {

        const pincode = req.data.pincode;

        const response = await conn.get(`/search?postalcode=${pincode}&format=json&addressdetails=1`);        

        const output = response[0];
        console.log(output);
        
       // console.log(output.address);
        //console.log(output.namedetails["name:ta"]);

        
        

        return {
            lan : output.lat,
            log : output.lon,
            pincode : output.address.postcode,
            city : output.address.city,
            district : output.address.state_district,
            state : output.address.state,
            display_name : output.display_name,
            boundingbox : output.boundingbox
        }
        

    })
})