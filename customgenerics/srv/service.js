const cds = require('@sap/cds');
const { INSERT } = require('@sap/cds/lib/ql/cds-ql');

module.exports = cds.service.impl( async function(){

    //this.before('READ')

    const {Students } = this.entities;


//When we use on hooks, it won't appear the mock data. 
//Instead that what are the information available inside the on hooks will be loaded here.
//Normally it loads the mock data which is inside the CSV files. 
//Here we overwrite the generic handlers.

    this.before('CREATE', Students, (req) => {
        //return 'Restructure CRUD/ Generic handles'

        console.log('Before operation has been triggered.');

        const {age} = req.data;

        console.log(req.data);


        if(age < 18){
            req.error('Student age is below 18');
        }



    })

    this.on('CREATE', Students, async (req)=>{
        console.log("On operation has been triggered");

        if(!req.data.ID){

            //uuid is present in utils modules
            req.data.ID = cds.utils.uuid();
            req.data.status = "Eligible";

            console.log(req.data);

            const reqdata = req.data;

            const insertoperation =  await INSERT.into(Students).entries(reqdata);

            console.log(insertoperation);
                
        }
           
    })

})