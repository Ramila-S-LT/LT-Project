const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

    const conn = await cds.connect.to('API_MAINTENANCEITEM');
    const {MaintenanceItem} = this.entities;

    this.on('READ', MaintenanceItem, async (req)=>{
        const data = await conn.run(req.query.limit(2));
        console.log(data);
        return data;
        
    } )

})