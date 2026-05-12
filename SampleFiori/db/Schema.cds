namespace Data;



entity Products {
    @title : '{i18n>PRODUCT_ID}'
    key ID : String;
    productName : localized String;
    unitPrice : Decimal;
    @title : '{i18n>STOCK}'
    stock : Integer;
    rating : Integer;
    virtual url : String;

    orderitem : Association to many OrderItems on orderitem.product = $self;
}


entity Customers {
    @title : '{i18n>CUSTOMER_ID}'
    key ID : String;

    customerName : localized String;
    @title : '{i18n>EMAIL}'
    email : String;
    @title : '{i18n>PHONE_NUMBER}'
    phoneNo : String;
    address : localized  String;
    imageurl : String;

    order : Association to many Orders on order.customer = $self;
}

entity Orders {
    key ID : String;
    orderNumber : String;
    date : Date @UI.DateTimeStyle:'short';
    time : Time;
    status : localized String;
    @title : '{i18n>CRITICALITY}'
    criticality : Integer;
    @title : '{i18n>TOTAL_PRICE}'
    totalPrice : Decimal;

    @title : '{i18n>CUSTOMER_ID}'
    customer : Association to Customers;
    orderItem : Composition of many OrderItems on orderItem.order = $self;
}

entity OrderItems {

    key ID : String;

    quantity : Integer;

    totalPrice : Decimal;

    order : Association to Orders;
    product : Association to Products;
}
