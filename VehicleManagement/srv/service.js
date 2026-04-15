const cds = require('@sap/cds');
const { SELECT, INSERT } = require('@sap/cds/lib/ql/cds-ql');

module.exports = cds.service.impl(async function(){

    const {Vehicles, Dealers, Orders, Taxs} = this.entities;


    //VALIDATIONS

    this.before('CREATE', Vehicles, async (req) => {

        // if(!req.data.vehicle_ID){
        //     req.error(`Vehicle ID is mandatory one...`);
        // }

        
        // if(!req.data.vehicle_ID.startsWith('TN') && !req.data.vehicle_ID.startsWith('KN')){
        //     req.error("The Vehicle ID should be starts with TN or KN");
        // }


        if(!req.data.Model_Name || !req.data.Price){
            req.error('Model Name and Price is mandatory');
        }

    })

    this.before('CREATE', Dealers, async (req) => {

        if(!req.data.Dealers_ID || !req.data.Dealer_Name){
            req.error('Dealer ID and Name is mandatory');
        }


        // if(req.data.State !== "Tamilnadu" && req.data.State !== "Karnataka"){
        //     req.error('State should be Tamilnadu or Karnataka');
        // }

    })

    this.before('CREATE', Orders, async (req) => {

        if(!req.data.Order_ID || !req.data.Quantity){
            req.error('Order ID and Quantity is required');
        }
    })


    //CUSTOM GENERIC HANDLERS

    this.on('CREATE', Vehicles, async (req) => {

        const {Vehicle_ID, Dealer_Reference} = req.data;
        console.log(Vehicle_ID, Dealer_Reference.Dealers_ID);
        
        
        req.data.Status = "Not Assigned";

        //req.data.Tax_ID





        const dealer = await SELECT.from(Dealers).where({Dealers_ID : Dealer_Reference.Dealers_ID });
        console.log(dealer);

        const prefixs = {
            "Tamilnadu" : 'TN - ',
            "Karnataka" : 'KA - ',
            "Kerala"    : "KE - "
        }

        const state = dealer[0].State;
        console.log(state);


        // //req.data.Tax_ID
        //const DealerTax = await SELECT.from(Taxs).where({State:state});
         //console.log(DealerTax);

        //req.data.Tax_ID = DealerTax[0].Tax_Amount;


        console.log(prefixs[state]);

        const prefixState = prefixs[dealer[0].State] || null;

        req.data.Vehicle_ID = prefixState + req.data.Vehicle_ID;

        const sample = await INSERT.into(Vehicles).entries(req.data);
        console.log(sample);
        

    


        

        //const state = dealer[0].State;

        // if(dealer[0].State === 'Tamilnadu'){

        //     req.data.Vehicle_ID =  "TN - " + req.data.Vehicle_ID;
        //     console.log(req.data.Vehicle_ID);

        //     const sample = await INSERT.into(Vehicles).entries(req.data);
        //     console.log(sample);
            

        // }else { //(dealer[0].State === 'Karnataka'){
        
            
        //     req.data.Vehicle_ID =  "KA - " + req.data.Vehicle_ID;
        //     console.log(req.data.Vehicle_ID);

        //     const sample = await INSERT.into(Vehicles).entries(req.data);
        //     console.log(sample);
            

        // }


    })

    this.on('CREATE', Dealers, async (req) => {

        req.data.State = req.data.State.charAt(0).toUpperCase() + req.data.State.slice(1);

        
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
        

        const ApproveOrder = await UPDATE(Vehicles).set({Status : "Approved"}).where({Vehicle_ID:id });

        console.log(ApproveOrder);

        return 'Vehicle is Approved';
        

    })

    //FUNCTIONS

    this.on('getTotalOrderValue', async (req)=> {

        const {id} = req.data;

        const vehicledata = await SELECT.from(Vehicles).where({Vehicle_ID : id}); 
        console.log(vehicledata);
         
        const OrderData = await SELECT.from(Orders).where({Vehicle_Reference : id});


        const taxprefix = {
            'TN'    : 100,
            'KA'    : 200,
            'KE'    : 350
        }

        const Substring = id.substring(0,2);
        console.log(Substring);

        const total =  ( vehicledata[0].Price * OrderData[0].Quantity ) + (OrderData[0].Quantity * taxprefix[id.substring(0,2)] );
        console.log(total);
        
        


        //  if(id.startsWith('TN')){

        //     const tax = 100;

        //     const price = vehicledata[0].Price;

        //     const quantity = OrderData[0].Quantity;

        //     const total = (price * quantity) + (quantity * tax);

        //     console.log(total);

        //     return `The Total Order Value : ${total}`;

        //  }else {

        //     const tax = 200;

        //     const price = vehicledata[0].Price;

        //     const quantity = OrderData[0].Quantity;

        //     const total = (price * quantity) + (quantity * tax);

        //     console.log(total);

        //     return `The Total Order Value : ${total}`;
        //  } 

    })

})