namespace vehicleOrder.srv;

using {OrderVehicle as db} from '../db/Schema';

service vehicleService{
    entity Vehicles as projection on db.Vehicles;
    entity Dealers as projection on db.Dealers;
    entity Orders as projection on db.Orders;
    entity OrderLineItems as projection on db.OrderLineItems;
    entity Stocks as projection on db.Stocks;
    entity States as projection on db.States;

    // entity Vehicles2 as projection on db.Vehicles{
    //     vehicle_ID
    // }

    view vehicleAPI as select from Vehicles{
        vehicle_ID
    }

    view stateAPI as select from States{
        state_ID
    }
}