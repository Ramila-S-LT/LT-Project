namespace externalSrv.srv;

using {externalAPI.db as db} from '../db/Schema';

//using {API_BUSINESS_PARTNER as s4} from './external/API_BUSINESS_PARTNER';

service ExternalService{
    
    entity sample as projection on db.A_AddressEmailAddress;
    entity newdata as projection on db.Newdata;

    //entity sample2 as projection on db.AddressEmailAddress;
    
}
