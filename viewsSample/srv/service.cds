namespace viewsrv.srv;

using {sampleviews as db} from '../db/Schema';
using {ViewsSampleview as viewsample} from '../db/views';

service proandview{

    //projection
    @cds.redirection.target : 'db.Orders'
    entity orders as projection on db.Orders;
    @cds.redirection.target : 'db.Customers'
    entity customer as projection on db.Customers;


    //Views
    entity orderviews as projection on viewsample.OrderWithCustomer;
    entity higheValueOrder as projection on viewsample.HighValueOrders;
    entity likeoperator as projection on viewsample.likeop;
    entity orderjoins as projection on viewsample.orderjoins;
    entity leftouterjoins as projection on viewsample.leftouterjoin;
    entity rightouterjoins as projection on viewsample.rightouterjoin;
    entity fullouter as projection on viewsample.fullouterjoin;
    entity crossjoins as projection on viewsample.crossjoin;
    entity aggre as projection on viewsample.aggre;
    
}