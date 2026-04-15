namespace VOM;

entity Vehicles{
    key ID : String;
    Model_Name : String;
    Price : Integer;
    Status : String;
    Dealer_Reference : Association to Dealers;
    Order_Reference : Composition of many Orders on Order_Reference.Vehicle_Reference = $self;
}

entity Dealers{
    key Dealers_ID : String;
    Dealer_Name : String;
    Location : String;
    Vehicles_Reference : Association to many Vehicles on Vehicles_Reference.Dealer_Reference = $self;
}

entity Orders{
    key Order_ID : String;
    Quantity : Integer;
    Vehicle_Reference : Association to Vehicles;
}