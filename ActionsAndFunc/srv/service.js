const cds = require('@sap/cds');
module.exports = cds.service.impl( async function(){


    const {employees} = this.entities;
    console.log('employees : ', employees);
    

    this.on('getAnnualSalary',  async (req) => {

        const {id} = req.data;
        console.log('First Id : ', id);
        

        if(!id) req.error(404, 'Employee is not Found...!');

        const emp = await SELECT.from(employees).where({EmpId : id});
        console.log("details ", emp);


        return emp[0]. salary *12;

    })

})