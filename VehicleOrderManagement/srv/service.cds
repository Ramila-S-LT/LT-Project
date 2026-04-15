namespace VOMservice.srv;

using {VOM as db} from '../db/schema';

service OrderManagement {
    entity Vehicles as projection on db.Vehicles;
    entity Dealers as projection on db.Dealers;
    entity Orders as projection on db.Orders;

    //Actions

    action approveVehicle(id : String) returns String;

    function getTotalOrderValue(id : String) returns String;

}