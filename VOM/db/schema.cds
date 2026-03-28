namespace VehicleManagementschema;

entity Vehicles{
    key Vehicle_ID : String;
    Model_Name : String;
    Price : Integer;
    Status : String;
    Order_Reference : Composition of many Orders on Order_Reference.Vehicle_Reference = $self;
    Dealer_Reference : Association to Dealers;
    State_Reference : Association to States;
}

entity Dealers {
    key Dealers_ID : String;
    Dealer_Name : String;
    Location : String;
    State : String;
    Vehicle_Reference : Association to many Vehicles on Vehicle_Reference.Dealer_Reference = $self;
    Order_Reference : Composition of many Orders on Order_Reference.Dealer_Reference = $self;

}

entity Orders {
    key Order_ID : String;
    Quantity : Integer;
    Vehicle_Reference : Association to Vehicles;
    Dealer_Reference : Association to Dealers;


}

entity States {
    key State_ID : String;
    State_Name : String;
    State_Code: String;
    Tax_Amount : Integer;
    Vehicle_Reference : Association to many Vehicles on Vehicle_Reference.State_Reference = $self;
}




//One vehicle can contain multiple orders...
//One Dealer can order many vehicles...
//One tax can apply to many Dealers...
//One Dealer can have many orders...