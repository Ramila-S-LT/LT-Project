namespace orderSample;

using {API_ORDER_BILL_OF_MATERIAL_SRV as srv4} from '../srv/external/API_ORDER_BILL_OF_MATERIAL_SRV';

entity A_BOMItem as projection on srv4.A_BOMItemCategory{
    BillOfMaterialItemCategory,
    FixedItemCategory
}