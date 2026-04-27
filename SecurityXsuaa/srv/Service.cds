using {db as DB} from '../db/Schema';

service api {

    entity Products
    @(restrict: [
        {
            grant : ['CREATE', 'READ', 'DELETE', 'UPDATE'],
            to : ['Admin']
        }
    ])
    as projection on DB.Products;

    entity Order
    @(restrict: [
        {
            grant : ['CREATE'],
            to : ['Viewer']
        }
    ])
    as projection on DB.Order;

}