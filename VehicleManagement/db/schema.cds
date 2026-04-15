namespace VOM;

entity Vehicles{
    key Vehicle_ID : String;
    Model_Name : String;
    Price : Integer;
    Status : String;
    Dealer_Reference : Association to Dealers;
    Tax_ID : Association to Tax;
    Order_Reference : Composition of many Orders on Order_Reference.Vehicle_Reference = $self;
}

entity Dealers{
    key Dealers_ID : String;
    Dealer_Name : String;
    Location : String;
    State : String;
    Vehicles_Reference : Association to many Vehicles on Vehicles_Reference.Dealer_Reference = $self;
}

entity Orders{
    key Order_ID : String;
    Quantity : Integer;
    Vehicle_Reference : Association to Vehicles;
}

entity Tax{
    key Tax_ID : String;
    State : String;
    Tax_Amount : Integer;
    vehicle : Association to many Vehicles on vehicle.Tax_ID = $self;
}

// One vehicle can have many orders.

// One dealer can order many vehicles.