namespace students.db;

entity Student {
    key ID: String;
    name : String;
    dept: String;
    year: String;
    feeStatus : String
}

entity books {
    key ID: String;
    name: String;
    price: String;
    quantity: String;
}