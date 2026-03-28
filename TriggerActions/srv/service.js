const cds = require('@sap/cds');
const { UPDATE, SELECT } = require('@sap/cds/lib/ql/cds-ql');
module.exports = cds.service.impl(async function() {

    const {Booking, Customer} = this.entities;
    console.log(Booking);
    


    this.on('bookTravels', async (req)=>{

        const {ID} = req.data;

        const updateData = await UPDATE(Booking).set({Status : "Booked"}).where({ID:ID});

        const display = await SELECT.from(Booking).where({ID:ID});
        console.log(display);

       const CustomerID = display[0].CustomerID;
        

        this.send({event : 'NotifyCustomer', data: {CustomerID, display}});

        return "Booking Approved";

    })

    this.on('NotifyCustomer', async (req) => {

        const {display, CustomerID} = req.data;
        console.log("notify", display);

        const Customerdata = await SELECT.from(Customer).where({ID:CustomerID});
        

        console.log(` Booking is confrimed for the Customer : \n
            Customer ID : ${display[0].ID} \n
            Customer Name : ${Customerdata[0].Customer_name} \n
            Travel Date : ${display[0].Travel_Date} \n 
            Travle Time : ${display[0].Travel_Time}`);

        return "Booking Confrimed";

    })


})




