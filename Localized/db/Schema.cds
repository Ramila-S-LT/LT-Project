namespace sample;

entity Districts {
    key ID : String;
    name : localized String @title : '{i18n>Name}';
    code : String;
    state : localized String @title : '{i18n>State Name}'; 
}
