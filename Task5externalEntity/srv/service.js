const cds = require('@sap/cds');
const { INSERT, SELECT } = require('@sap/cds/lib/ql/cds-ql');

module.exports = cds.service.impl(async function(){

    const {sample, newdata} = this.entities;

    console.log(sample);

    const s4 = await cds.connect.to("API_BUSINESS_PARTNER");

    this.on('READ', sample, async(req) => {
        console.log(req.query);
        
        const bp = await s4.run(req.query);
        console.log(bp);

        //console.log("Fetched from sandbox :", bp.length);

        const updatedata = await UPSERT.into(sample).entries(bp);
        console.log(updatedata);

        return bp;
        
    })

    this.on('CREATE', newdata, async (req)=>{
        const data = await INSERT.into(newdata).entries(req.data);
        console.log(data);
        
    })

})