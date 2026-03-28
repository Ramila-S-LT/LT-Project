const cds = require('@sap/cds');

module.exports = cds.service.impl(async function(){


    this.after('READ', 'Salary_Details', (each) => {

        each.Salary_with_Bonus = each.salary + 500;
        
    })

})
