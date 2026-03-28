service Mapapi{

    function getMapDetails(pincode : String) returns {
        lan : String;
        log : String;
        city : String;
        district : String;
        state : String;
        bounding : array of String;
    }
}