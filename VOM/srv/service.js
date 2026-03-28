const cds = require('@sap/cds');
const { INSERT, SELECT } = require('@sap/cds/lib/ql/cds-ql');

module.exports = cds.service.impl(async function() {
    
    const {Vehicles, Dealers, Orders, States} = this.entities;

    //BEFORE

    this.before('CREATE', Vehicles, async(req) => {
        
        if(!req.data.Model_Name || !req.data.Price){
            req.error('Model Name and Price is mandatory');
        }

    })


    this.before('CREATE', Dealers, async(req) => {
        
        if(!req.data.Dealers_ID || !req.data.Dealer_Name){
            req.error('Dealer ID and Name is mandatory')
        }

    })

    this.before('CREATE', Orders, async(req) => {

        if(!req.data.Order_ID || !req.data.Quantity){
            req.error('Order ID and Quantity is required');
        }

    })


    //ON

    this.on('CREATE', Vehicles, async(req) =>{

        const {Vehicle_ID, Dealer_Reference,State_Reference} = req.data;
        console.log(Vehicle_ID, Dealer_Reference.Dealers_ID, State_Reference.State_ID);

        req.data.Status ='Not Assigned';


        const dealer = await SELECT.from(Dealers).where({Dealers_ID : Dealer_Reference.Dealers_ID});
        console.log(dealer);

        console.log(dealer[0].State);

        const prefixState = await SELECT.from(States).where({State_Name:dealer[0].State});
        console.log(prefixState);

         req.data.Vehicle_ID = prefixState[0].State_Code + req.data.Vehicle_ID;
         console.log(req.data.Vehicle_ID);    
        

        // const prefixs ={
        //     "Tamilnadu" : 'TN',
        //     "Karnataka" : 'KA',
        //     "Kerala"    : 'KL'
        // }

        // const state = dealer[0].State;
        // console.log(state);

        //console.log(prefixs[state]);

        //const prefixState = prefixs[dealer[0].State] || null;

        //req.data.Vehicle_ID = prefixState + req.data.Vehicle_ID;

        const sample = await INSERT.into(Vehicles).entries(req.data);
        console.log(sample);

    })

    this.on('CREATE', Dealers, async (req) => {
        req.data.State = req.data.State.charAt(0).toUpperCase() + req.data.State.slice(1);

        await INSERT.into(Dealers).entries(req.data);
    })

    this.on('CREATE', Orders, async(req) => {

        const{Vehicle_Reference} = req.data;
        const id = Vehicle_Reference.Vehicle_ID;
        console.log(id);
        
        

        await INSERT.into(Orders).entries(req.data);


        this.send({event : 'approveVehicle', data:{id}});

    })




    //ACTIONS
    this.on('approveVehicle', async (req) => {

        const {id} = req.data;
        console.log(id);
        

        const ApproveOrder = await UPDATE(Vehicles).set({Status : "Approved"}).where({Vehicle_ID:id });

        console.log(ApproveOrder);

        return 'Vehicle is Approved';
        

    })


    //FUNCTIONS
    this.on('getTotalOrderValue', async (req) => {
        const {id} = req.data;
        console.log(id);

        const vehicledata = await SELECT.from(Vehicles).where({Vehicle_ID:id});
        console.log(vehicledata);
        

        const Vehicleid = id.substring(0,2);
        console.log(Vehicleid);

        const Orderdata = await SELECT.from(Orders).where({Vehicle_Reference : id});
        console.log(Orderdata);
        


        const TaxData = await SELECT.from(States).where({State_Code : Vehicleid});

        const total = (vehicledata[0].Price * Orderdata[0].Quantity) + (Orderdata[0].Quantity * TaxData[0].Tax_Amount);
        console.log(total);
        
        
        
    })

    


})