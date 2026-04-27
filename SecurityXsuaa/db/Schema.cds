namespace db;

entity Products {
    key ID : String;
    Product_Name : String;
    Stock : Integer;

}

entity Order {
    key ID : String;
    Order_Product : String;
    Quantity : String;
    Products : Association to Products;
}
