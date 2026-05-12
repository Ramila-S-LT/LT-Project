namespace datasrv.srv;

using {Data as db} from '../db/Schema';

service api {
    entity Products as projection on db.Products;
    entity Customers as projection on db.Customers;
    @odata.draft.enabled  
    entity Order as projection on db.Orders {
        *,
        @Core.Computed
        totalPrice,
        orderItem,

    };

    entity OrderItem as projection on db.OrderItems {
        *,
        @Core.Computed
        totalPrice
    };

    
    // action Status(ID : String) returns many String;
    // action cancel(ID : String) returns many String;

}