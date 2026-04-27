namespace dbsrv.srv;

using {db as DB} from '../db/Schema';

service api {
    entity Orders
    @(restrict: [
        {
            grant : ['READ'],
            to: ['Riskviewer']
        },
        {
            grant:['*'],
            to: ['RiskManager']
        }
    ])
    as projection on DB.Orders;
}