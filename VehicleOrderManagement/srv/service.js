const cds = require('@sap/cds');
const { SELECT, INSERT, orders } = require('@sap/cds/lib/ql/cds-ql');

module.exports = cds.service.impl(async function(){

    const {Vehicles, Dealers, Orders} = this.entities;


    //VALIDATIONS

    this.before('CREATE', Vehicles, async (req) => {

        if(!req.data.vehicle_ID){
            req.error(`Vehicle ID is mandatory one...`);
        }

        
        if(!req.data.vehicle_ID.startsWith('TN') && !req.data.vehicle_ID.startsWith('KN')){
            req.error("The Vehicle ID should be starts with TN or KN");
        }





        if(!req.data.Model_Name || !req.data.Price){
            req.error('Model Name and Price is mandatory');
        }


    })

    this.before('CREATE', Dealers, async (req) => {

        if(!req.data.Dealers_ID || !req.data.Dealer_Name){
            req.error('Dealer ID and Name is mandatory');
        }
    })

    this.before('CREATE', Orders, async (req) => {

        if(!req.data.Order_ID || !req.data.Quantity){
            req.error('Order ID and Quantity is required');
        }
    })


    //CUSTOM GENERIC HANDLERS

    this.on('CREATE', Vehicles, async (req) => {
        
        req.data.Status = "Not Assigned";

        await INSERT.into(Vehicles).entries(req.data);

    })

    this.on('CREATE', Dealers, async (req) => {
        await INSERT.into(Dealers).entries(req.data);
    })

    this.on('CREATE', Orders, async (req) => {
        await INSERT.into(Orders).entries(req.data);
    })


    //AFTER HOOKS

    this.after('CREATE', Vehicles, async (req, data) =>{

        data.message = 'Vehicles is Created';

    })

    this.after('CREATE', Dealers, async (req,data) => {

        data.message = 'Dealer is created';
    })

    this.after('CREATE', Orders, async (req, data ) =>{
        data.message = 'Orders Created Successfully';
    })


    

    //ACTIONS

    this.on('approveVehicle', async (req) => {

        const {id} = req.data;
        console.log(id);
        

        const ApproveOrder = await UPDATE(Vehicles).set({Status : "Approved"}).where({vehicle_ID:id });

        console.log(ApproveOrder);

        return 'Vehicle is Approved';
        

    })

    //FUNCTIONS

    this.on('getTotalOrderValue', async (req)=> {

        const {id} = req.data;

        const vehicledata = await SELECT.from(Vehicles).where({vehicle_ID : id}); 
        console.log(vehicledata);
         
        const OrderData = await SELECT.from(Orders).where({Vehicle_Reference : id});

         if(id.startsWith('TN')){

            const tax = 100;

            const price = vehicledata[0].Price;

            const quantity = OrderData[0].Quantity;

            const total = (price * quantity) + (quantity * tax);

            console.log(total);

            return `The Total Order Value : ${total}`;

         }else {

            const tax = 200;

            const price = vehicledata[0].Price;

            const quantity = OrderData[0].Quantity;

            const total = (price * quantity) + (quantity * tax);

            console.log(total);

            return `The Total Order Value : ${total}`;
         }


       
        

    })

})