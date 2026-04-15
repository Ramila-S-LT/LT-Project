
using {destinationsesso as db} from '../db/Schema';

service desto {
    entity SampleDealer as projection on  db.SampleDealer;

    function getmapdetails(Country : String, pincode : String) returns array of String;

    function temp(lat : Decimal, lon : Decimal) returns array of String;

}