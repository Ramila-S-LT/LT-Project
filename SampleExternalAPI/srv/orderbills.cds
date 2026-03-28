namespace orderbills.srv;

using {orderSample as os} from '../db/ORDERBILL';
using {API_ORDER_BILL_OF_MATERIAL_SRV as s4} from './external/API_ORDER_BILL_OF_MATERIAL_SRV';

service OrderEntity {
    entity orderdata as projection on os.A_BOMItem;
    entity fullOrderdata as projection on s4.A_BOMItemCategory;

}

