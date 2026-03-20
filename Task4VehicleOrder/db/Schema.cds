namespace OrderVehicle;
//using {managed} from '@sap/cds/common';

entity Vehicles  {
    key vehicle_ID : String;
    model_Name : String;
    old_Price   : Integer;
    new_Price : Integer;
    stockReference : Composition of one Stocks on stockReference.vehicleReference = $self; // UnManaged one to one composition 
    orderReference : Composition of many Orders on orderReference.vehicleReference = $self; // unmanaged one to many composition with self
    lineItemsReference : Association to many OrderLineItems on lineItemsReference.vehicleReference = $self; //Unmanaged one to many association without self
}

entity Stocks {
    key stock_ID : String;
    stock_Amount : Integer;
    vehicleReference : Association to  Vehicles;     
}

entity Dealers {
    key dealer_ID : String;
    dealer_Name : String;
    dealer_State : String;
    dealer_Location : String;
    orderReference : Composition of many Orders on orderReference.dealerReference = $self; 
}

entity Orders {
    key order_ID : String;
    quantity : Integer;
    dealerReference : Association to Dealers;
    vehicleReference : Association to Vehicles;
    //lineItemsReference : Composition of many OrderLineItems on lineItemsReference.orderReference.order_ID = order_ID;
    lineItemsReference : Composition of many OrderLineItems on lineItemsReference.order_ID = order_ID;
    // unmanaged one to many composition without self;
}

entity OrderLineItems {
    key newvehicle_ID : String;
    total_Price : Integer;
    //orderReference : Association to Orders;

    order_ID : String; //FK
    orderReference : Association to Orders on orderReference.order_ID = order_ID;
    vehicleReference : Association to Vehicles;
    stateReference : Association to States;
    
}

entity States {
    key state_ID : String;
    state_Name : String;
    state_Code : String;
    tax_Amount : Integer;
    lineItemsReference : Association to many OrderLineItems on lineItemsReference.stateReference = $self; // Unmanaged one to many association with self  
}
































// entity Vehicles  {
//     key vehicle_ID : String;
//     model_Name : String;
//     old_Price   : Integer;
//     new_Price : Integer;
//     User_log : String;
//     orderReference : Composition of many Orders on orderReference.vehicleReference = $self;
//     lineItemsReference : Association to many OrderLineItems on lineItemsReference.vehicleReference = $self;
// }

// entity Stocks{
//     key stock_ID : String;
//     stock_Amount : Integer;
//     vehicleReference : Association to Vehicles;  //Managed Associations
    
// }

// entity Dealers{
//     key dealer_ID : String;
//     dealer_Name : String;
//     dealer_State : String;
//     dealer_Location : String;
//     orderReference : Composition of many Orders on orderReference.dealerReference = $self;
// }

// entity Orders{
//     key order_ID : String;
//     quantity : Integer;
//     dealerReference : Association to Dealers;
//     vehicleReference : Association to Vehicles;
//     lineItemsReference : Composition of many OrderLineItems on lineItemsReference.orderReference = $self;
// }

// entity OrderLineItems{
//     key newvehicle_ID : String;
//     //newvehicle_ID : String;
//     total_Price : Integer;
//     orderReference : Association to Orders;
//     stateReference : Association to States;
//     vehicleReference : Association to Vehicles;
// }

// entity States{
//     key state_ID : String;
//     state_Name : String;
//     state_Code : String;
//     tax_Amount : Integer;
//     lineItemsReference : Association to many OrderLineItems on lineItemsReference.stateReference = $self;
    
// }

// // entity LogUsers{
// //     key user_ID : String;
// //     user_Name : String;
// // }

