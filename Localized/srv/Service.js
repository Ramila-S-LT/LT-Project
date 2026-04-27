const cds = require('@sap/cds');
const { SELECT } = require('@sap/cds/lib/ql/cds-ql');

module.exports = cds.service.impl(async function(){

    const {Districts} = this.entities;

    this.on('getdata' , async(req)=>{

        const activeData = await SELECT.from(Districts);
        console.log("Active Data :", activeData);

        const draftData =  await SELECT.from('sampleservice.Districts_drafts');
        console.log("Draft Data :", draftData);
        
        return [...activeData, ...draftData];

    })

});