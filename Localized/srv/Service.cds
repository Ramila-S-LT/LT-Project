using {sample as db} from '../db/Schema';

service sampleservice {

    @odata.draft.enabled
    entity Districts as projection on db.Districts;

    function getdata()  returns array of String;
}
//annotate db.Districts with @odata.draft.enabled;



