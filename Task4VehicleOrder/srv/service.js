const cds = require('@sap/cds');
//const { data } = require('@sap/cds/lib/dbs/cds-deploy');
const { INSERT, SELECT, UPDATE, DELETE } = require('@sap/cds/lib/ql/cds-ql');
//const { results } = require('@sap/cds/lib/utils/cds-utils');

module.exports = cds.service.impl(async  function(){

    const {Vehicles, Dealers, Orders, OrderLineItems, Stocks, States} = this.entities;



    //--------------------------------BEFORE --------------------------------------

    //VEHICLE ENTITY

    this.before('CREATE', Vehicles, async (req) => {

        if(!req.data.vehicle_ID){
            req.error('Vehicle ID is needed');
        }

        if(!req.data.model_Name){
            req.error('Model Name is required');
        }
    })

    // this.before('CREATE', 'Stocksample', async (req) => {

    //     const {stock_Amount} = req.data;

    //     if(!stock_Amount){
    //         req.error('Stock amount is required');
    //     }

    // })


    //STOCK ENTITY

    this.before('CREATE', Stocks, async (req)=>{

        const {stock_ID, stock_Amount, vehicleReference} = req.data;

        if(!stock_ID || !stock_Amount){
            req.error('Either Stock ID , Stock Amount is missing. both are needed');
        }


        const vehicledata = await SELECT.one.from(Vehicles).where({vehicle_ID : vehicleReference.vehicle_ID });
        //console.log('vehicle : ' , vehicledata);
        
        if(!vehicledata){
            req.error(`There is no Vehicle is avaible with ID ${vehicleReference.vehicle_ID} in Vehicle Entity`);
        }

        const data = await SELECT.one.from(Stocks).where({vehicleReference_vehicle_ID : vehicleReference.vehicle_ID});
        //console.log(data);
        

        if(data){
            req.error(`no duplication is allowed for ${req.data.vehicleReference.vehicle_ID}`);
        }

    })


    //ORDER ENTITY

    this.before('CREATE', Orders, async (req) => {

        if(!req.data.order_ID){
            req.error('Order ID is required');
        }

        const dealerData = await SELECT.one.from(Dealers).where({dealer_ID : req.data.dealerReference.dealer_ID});
        console.log(dealerData);

        if(!dealerData){
            req.error(`Dealer ID is not available. Please check with dealer ID`);
        }
        

        const stockdata = await SELECT.from(Stocks).where({vehicleReference:req.data.vehicleReference.vehicle_ID});
        console.log(stockdata);

        if(stockdata[0].stock_Amount < req.data.quantity){
            req.error(`There is a limited stock. ${stockdata[0].stock_Amount} is there...`);
        }
        

    })


    //STATE ENTITY
    
    this.before('CREATE', States, async (req) => {

        if(!req.data.state_ID){
            req.error('State ID is required');
        }
    })


    //-------------------------------------------ON ---------------------------------

    //VEHICLE ENTITY

    this.on('CREATE', Vehicles, async (req) => {

        if(!req.data.old_Price){
            req.data.old_Price = 0;
        }

        // if(!req.data.User_log){
        //     req.data.User_log = null;
        // }

       // console.log(req.user.id);
        

        const result = await INSERT.into(Vehicles).entries(req.data);
        console.log(result); 

    })


    //STOCK ENTITY

    this.on('CREATE', Stocks, async (req) =>{
        const result = await INSERT.into(Stocks).entries(req.data);
        console.log(result);    
    })

    //DEALER ENTITY

    this.on('CREATE', Dealers, async (req)=>{
        const result = await INSERT.into(Dealers).entries(req.data);
        console.log(result); 
    })

    //ORDER ENTITY

    this.on('CREATE', Orders, async(req) => {

        
        const stockupdate = await SELECT.from(Stocks).where({vehicleReference : req.data.vehicleReference.vehicle_ID});
        console.log(stockupdate);

        const newStock = stockupdate[0].stock_Amount - req.data.quantity;
        console.log(newStock);

        const updates = await UPDATE(Stocks).set({stock_Amount: newStock}).where({vehicleReference: req.data.vehicleReference.vehicle_ID});
        console.log(updates);
        
        
        const result = await INSERT.into(Orders).entries(req.data);
        console.log(result);

    })


    // this.before('CREATE', OrderLineItems, async(req)=>{

    //         const {orderReference} = req.data;

    //       const orderRefer = await SELECT.from(Orders).where({order_ID : orderReference.order_ID});
    //       console.log(orderRefer);

    //       if(req.data.length != orderRefer[0].quantity){
    //         req.error('Data length must be same');
    //       }

    // })


    //ORDERLINEITEMS ENTITY

    this.on('CREATE', OrderLineItems, async(req)=>{


        //const {vehicle_ID, order_ID, stateReference} = req.data;

        const {orderReference} = req.data;

        const orderRefer = await SELECT.from(Orders).where({order_ID : orderReference.order_ID});
        console.log("Order Entity : " , orderRefer);
        const vehicledata = orderRefer[0].vehicleReference_vehicle_ID;
        console.log(vehicledata);
        
        req.data.vehicleReference_vehicle_ID = vehicledata;
        const vehicleNameID = req.data.vehicleReference_vehicle_ID;
        console.log("vehicle ID :", vehicleNameID);
        

        const dealerRefer = await SELECT.from(Dealers).where({dealer_ID : orderRefer[0].dealerReference_dealer_ID});
        console.log(dealerRefer);

        const dealerState = dealerRefer[0].dealer_State;
        console.log(dealerState);
        //req.data.stateReference = dealerState;
        

        const state = await SELECT.from(States).where({state_Name : dealerState});
        console.log("State :", state);
        req.data.stateReference_state_ID = state[0].state_ID;
        const stateName = req.data.stateReference_state_ID;
        console.log("State Reference : ", stateName);
        

        //req.data.newvehicle_ID = state[0].state_Code + req.data.newvehicle_ID;   
        
        
        const vehiprice = await SELECT.from(Vehicles).where({vehicle_ID : vehicledata});
        console.log("Actual vehicle Price : ", vehiprice[0].new_Price);

        const totalprice = state[0].tax_Amount + vehiprice[0].new_Price;
        console.log("Total Price :", totalprice);
        

        const orderCount = orderRefer[0].quantity;
        console.log("Order Count :", orderCount);

        //console.log(req.data.length);
        
        //const result = await INSERT.into(OrderLineItems).entries(data);

        let items = [];

        
        for(let i=0; i<orderCount; i++){
                items.push({
                    newvehicle_ID :  `${state[0].state_Code}${req.data.newvehicle_ID}-${i+1}`,
                    total_Price : totalprice,
                    orderReference,
                    stateReference_state_ID : stateName,
                    vehicleReference_vehicle_ID : vehicleNameID
                    
                    
                })
        }

            const result = await INSERT.into(OrderLineItems).entries(items);
            console.log(result);
        
    })

    //STATES ENTITY

    this.on('CREATE', States, async(req)=>{
        const result = await INSERT.into(States).entries(req.data);
        console.log(result);
        
    })



    
    // VEHICLE ENTITY READ

    this.on('READ', Vehicles, async (req) => {
        const data = await SELECT.from(Vehicles);
        return data;
    })

    
    //DEALER ENTITY READ

    this.on('READ', Dealers, async(req)=>{
        const DealerData = await SELECT.from(Dealers).columns(['dealer_ID', 'dealer_Name', 'dealer_State']);
        console.log(DealerData);
        return DealerData;

    })

    //STATE ENTITY READ

    this.on('READ', States, async(req)=>{
        const stateData = await SELECT.from(States).columns([
            {ref : ['state_ID'], as : 'State ID'},
            {ref: ['state_Name'], as : 'State Name'},
            {ref: ['tax_Amount'], as : 'Tax Amount'}
        ]);
        console.log(stateData);
        return stateData;
    })

    //VEHICLE ENTITY UPDATE

    this.on('UPDATE', Vehicles, async(req)=>{

        const{vehicle_ID, new_Price} = req.data;

        const getdata = await SELECT.from(Vehicles).where({vehicle_ID});
        console.log(getdata);
        
        const new_pricedata = getdata[0].new_Price;

        const updatedata = await UPDATE(Vehicles).set({old_Price : new_pricedata, new_Price : req.data.new_Price}).where({vehicle_ID});
        console.log(updatedata);
        
    });

    //STOCK ENTITY UPDATE


    this.on('UPDATE', Stocks, async(req)=>{

        const{stock_ID} = req.data;

        const updatestock = await UPDATE(Stocks).set({stock_Amount : req.data.stock_Amount}).where({stock_ID});
        console.log(updatestock);
        
    })

    //ORDER ENTITY UPDATE

    this.on('UPDATE', Orders, async(req)=>{
        const {order_ID, quantity} = req.data;
        console.log("Quantity : ", quantity);

        const getdata = await SELECT.from(Orders).where({order_ID});
        console.log(getdata);

        const stockData = await SELECT.from(Stocks).where({vehicleReference : getdata[0].vehicleReference_vehicle_ID});
        console.log(stockData);
        
        
        if(quantity > getdata[0].quantity){ // 4 > 1

            const newordercount = quantity - getdata[0].quantity;  // 4 -1 ==> 3
            console.log("new count : ", newordercount); // 3
            
            const newstock = stockData[0].stock_Amount - newordercount; // 7 - 3
            console.log("new stock :", newstock); // 4          
            const stockupdate = await UPDATE(Stocks).set({stock_Amount : newstock}).where({vehicleReference : getdata[0].vehicleReference_vehicle_ID});
            console.log( "stock update : " , stockupdate);
            
            
            const orderData = await UPDATE(Orders).set({quantity : req.data.quantity}).where({order_ID});
            console.log("Order Data :", orderData);

        }else{ // 1 < 2  --> // 4 < 1
            
            const newordercount = getdata[0].quantity - quantity;  // 4 - 1
            console.log("new count :", newordercount);  // 3

            const newstock = stockData[0].stock_Amount + newordercount; // 4 + 3
            console.log("new stock :", newstock); // 7

            const stockupdate = await UPDATE(Stocks).set({stock_Amount : newstock}).where({vehicleReference : getdata[0].vehicleReference_vehicle_ID});
            console.log("stock update", stockupdate);
            
            const orderData = await UPDATE(Orders).set({quantity : req.data.quantity}).where({order_ID});
            console.log("Order Data :", orderData);
            
        }
        
    })


    this.on('DELETE', Vehicles, async (req) => {

        const {vehicle_ID} = req.data;

        const flag = await SELECT.one.from(Vehicles).where({vehicle_ID});
        console.log("flag :", flag);

        if(!flag){
            
            req.error(`no such id is present`);
            
        }

            const data = await DELETE.from(Vehicles).where({vehicle_ID});
            console.log("data :", data);
        
    })

    //ORDER ENTITY DELETE

    this.on('DELETE', Orders, async (req) => {
        const {order_ID} = req.data;

        const flag = await SELECT.one.from(Orders).where({order_ID});
        console.log(flag);

        if(!flag){

                req.error('no such id is available') 
        }

            const data = DELETE.from(Orders).where({order_ID});
            console.log(data);

        
    })


    
    //--------------------------------AFTER -------------------------------------------------

    //VEHICLE ENTITY

    this.after('CREATE', Vehicles, async (data,req) =>{
        console.log('Vehicle data is created successfully');
        
    })

     this.after('CREATE', Dealers, async (data,req) =>{
        console.log('Dealer data is added successfully');
        
    })



    //ORDER ENTITY

    this.after('CREATE', Orders, async (data, req) => {

        // const vehicle_ID = req.data.vehicleReference.vehicle_ID;
        // console.log(vehicle_ID);
        
        console.log(req.data);
        
        const remainStock = await SELECT.one.from(Stocks).where({vehicleReference:req.data.vehicleReference_vehicle_ID});
        console.log(remainStock);
        

        console.log(`Ordered successfully for the ${req.data.dealerReference_dealer_ID}.
                        and the remaining stock for the vehicle ${req.data.vehicleReference_vehicle_ID} is ${remainStock.stock_Amount}`);

    })
    

    
})