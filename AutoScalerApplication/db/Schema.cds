namespace db;

entity Product {
    key ID : String;
    Name : String;
    Stock : Integer;

}

entity Order {
    key ID : String;
        ProductName : String;
        Quantity : Integer;
        product : Association to Product;
}