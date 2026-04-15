const cds = require('@sap/cds'); //Importing the modules
const { INSERT } = require('@sap/cds/lib/ql/cds-ql');
// const { SELECT } = require('@sap/cds/lib/ql/cds-ql');

module.exports = cds.service.impl(async function(){


    const {Studs} = this.entities;  // compare

    this.before('CREATE', Studs,  (req)=>{
        
        console.log('Before handlers is running');

        const {year} = req.data;

        console.log(year);
        console.log(req.data);

        if(year !== 'III'){
            req.error('Only III year students are registered here');
            
        } 

    })

    // this.before('UPDATE', Studs,  (req) => {

    //     console.log("BEFORE - UPDATE IS RUNNING");

    //     const {year} = req.data;

    //     if(year === 'II'){
    //         req.error('Not Allowed II year');
    //     }
        

    // })

    // this.before('GET', Studs, async (req)=>{
    //     console.log("READ OPERATION RUNNING");

    //     const data = await SELECT.from(Studs);

    //     console.log(data);
        
        
    // })


    this.on('CREATE', Studs, async (req)=>{
        console.log('On Process Running');

        if(!req.data.ID){

            req.data.ID = cds.utils.uuid();
            req.data.feeStatus = "Pending";

            console.log(req.data);
            const reqdata = req.data;

            const insertoperation = await INSERT.into(Studs).entries(reqdata);
            console.log(insertoperation);
        
        }
    })

    // this.after('READ', Studs, async(data) => {
        
    //     console.log("After Hook is Running");
        

    //     const students = Array.isArray(data) ? data : [data]

    //     console.log("Students Data : " , students);
        

    //     students.forEach(students => {
    //         students.state = "active"
    //     })

    //     console.log(data);
        
    // })



    //AFTER HOOK --> READ
    this.after('READ', Studs, (each)=>{
        each.notpaid = each.feeStatus === 'Pending' ? 'Fee is in pending state' : 'Fee process is completed';
    });

    


})