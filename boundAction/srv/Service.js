const cds = require('@sap/cds');
const { UPDATE } = require('@sap/cds/lib/ql/cds-ql');

module.exports = cds.service.impl(async function() {

    const {Students, Courses} = this.entities;

    this.on('CREATE', Students, async (req) => {
        console.log("Inside Before");
        
        //const {Fee_Status} = req.data;
        //console.log(Fee_Status);
        
        const {ID, Student_Name, Dept} = req.data;

        if(!req.data.Fee_Status){
            Fee_Status = 'Pending';
        }

        await INSERT.into(Students).entries({ID, Student_Name, Dept, Fee_Status});
        //return Students;

    })


    this.on('update', async (req) => {

        const {ID} = req.params[0];

        console.log(ID);
        
        console.log("Action");
        
        const data = await UPDATE(Students).set({Fee_Status : 'Paid'}).where({ID: ID});
        console.log(data);

        return data;
    })

    this.on('calculate', async (req) => {

        const {ID} = req.params[0];

        const amt = 5000;
        const finalAmt = amt/2;

        console.log(finalAmt);
        
        return finalAmt;
    })

})


