namespace app.srv;

using {db as Db} from '../db/Schema';

service api {
    entity Products as projection on Db.Product;
    entity Order as projection on Db.Order;

    function getdata() returns array of String;
}