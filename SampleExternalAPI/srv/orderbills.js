const cds = require('@sap/cds');

module.exports = cds.service.impl(async  function() {

    const {orderdata, fullOrderdata} = this.entities;

    const conn = await cds.connect.to('API_ORDER_BILL_OF_MATERIAL_SRV');

    this.on('READ', orderdata, async (req) => {

        console.log(req.query);

        const od = await conn.run(req.query);
        console.log(od);
        return od;
        

    })

    this.on('READ', fullOrderdata, async (req)=>{
        const sdata = await conn.run(req.query);
        return sdata;
    })

})