namespace busCustomerservice.srv;

using {busCustomer as db} from '../db/schema';

service travels {
    
    entity Customer as projection on db.Customer;
    entity Booking as projection on db.Booking;

    //actions:

    // action bookTravels(id: String) returns String;
    //action BookingTravles(ID: String, Travel_Date : Date,
    // Travel_Time : Time,
    // travelID : String,
    // CustomerID:String) returns String;

    // action notifyCustomer(ID : String) returns String;


    action bookTravels(ID:String) returns String;
}