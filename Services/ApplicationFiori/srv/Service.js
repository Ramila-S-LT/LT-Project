const cds = require('@sap/cds');
const { SELECT, INSERT, UPDATE } = require('@sap/cds/lib/ql/cds-ql');

module.exports = cds.service.impl(async function () {

    const {Products, Customers, Order, OrderItem} = this.entities;

    this.before('CREATE', Products, async (req) => {

        const {ID, productName} = req.data;
        const prevData = await SELECT.from(Products).where({productName : productName});
        console.log(prevData);    
        
        if(prevData){
            req.error("Duplication is not allowed");
        }

    });


    this.before('CREATE', Order, async (req) => {
        console.log("Before Handler");
        

        const {customer_ID, order} = req.data;

        const prevData = await SELECT.one.from(Customers).where({ID : customer_ID});
        console.log(prevData);
        

        if(!prevData){
            req.error (`No Customer exists with ID ${customer_ID}`)
        }

        if(!req.data.status || !req.data.totalPrice) {
            req.data.status = 'Pending';
            req.data.totalPrice = 0;
        }

    })

    this.before('CREATE', OrderItem , async (req) => {

        const {order_ID, product_ID} = req.data;

        const orderdata = await SELECT.one.from(Order).where({ID : order_ID});
        console.log(orderdata);

        const productData = await SELECT.one.from(Products).where({ID : product_ID});
        console.log(productData);

        if (!orderdata) {
            req.error (`The order number doesn't exists with ID ${order_ID}`); 
        }

        if(!productData) {
            req.error (`Product doesn't exists with ID  ${product_ID}`);
        }

    })

    this.on('CREATE', OrderItem, async (req) => {

        const {quantity} = req.data;
        const price = req.data.quantity * req.data.unitPrice;
        console.log(price);
        req.data.totalPrice = price;
        const data = await INSERT.into(OrderItem).entries(req.data);
        console.log(data);

        const ProductData = await SELECT.one.from(Products).where({ID : req.data.product_ID});
        console.log(ProductData);

        const stock = ProductData.stock;
        const redstock = stock - quantity;

        await UPDATE(Products).set({stock : redstock}).where({ID : req.data.product_ID});     

    })

    // this.on('Status', async (req) => {

    //     console.log("hiiiiiiiii");
        
    //     const {ID} = req.data;
    //     console.log("Inside actions");
        

    //     const data = await SELECT.one.from(Order).where({ID});
    //     console.log("Data 1 : ", data);

        
    //     if(data.status === 'Processing') {
    //         const data  = await UPDATE(Order).set({status : 'Shipped'}).where({ID});
    //         console.log("Data 2 : ", data);
            
    //     }else if(data.status === 'Shipped') {
    //         const data = await UPDATE(Order).set({status : 'Delivered'}).where({ID});
    //         console.log("Data 3 : ", data);
            
    //     }

    // })

    // this.on('cancel', async (req) => {
    //     const {ID} = req.data;
    //     await UPDATE(Order).set({status : 'Cancelled'}).where({ID});
    // })

})