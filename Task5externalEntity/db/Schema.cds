namespace externalAPI.db;

using {API_BUSINESS_PARTNER as s4} from '../srv/external/API_BUSINESS_PARTNER';

@cds.persistence.table
entity A_AddressEmailAddress as projection on s4.A_AddressEmailAddress{
   key  AddressID,
   key Person,
   key OrdinalNumber,
    EmailAddress,
    IsDefaultEmailAddress,
    //NewdataRefer : Association to Newdata;
}


entity Newdata {
    key ID : String;
    Temporary_Address : String;
    Phn_No : String;
    MasterRefer_AddressID : String;   // manual FK
    MasterRefer : Association to A_AddressEmailAddress
        on MasterRefer.AddressID = MasterRefer_AddressID;
}







