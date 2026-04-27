namespace consume.srv;

using {API_BUSINESS_PARTNER as s4} from './external/API_BUSINESS_PARTNER.csn';

service consumeApi {

    entity A_BusinessPartnerAddress as projection on s4.A_BusinessPartnerAddress {
        BusinessPartner,
        AddressID,
        CityName,
        Country,
    };
}