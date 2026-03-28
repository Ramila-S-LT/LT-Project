namespace serviceVehicle.srv;

using {VehicleManagementschema as db} from '../db/schema';

service vehicleMng {
    entity Vehicles as projection on db.Vehicles;
    entity Dealers as projection on db.Dealers;
    entity Orders as projection on db.Orders;
    entity States as projection on db.States;

    //ACTIONS

    action approveVehicle(id : String) returns String;

    //FUNCTIONS

    function getTotalOrderValue(id : String) returns String;
}