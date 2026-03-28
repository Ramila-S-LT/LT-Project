namespace busCustomer;


entity Customer{
    key ID : String;
    Customer_name : String;
    Gender : String;
    Phone_No : String;

}

entity Booking {
    key ID : String;
    Travel_Date : Date;
    Travel_Time : Time;
    travelID : String;
    CustomerID:String;
    Status : String;


}
