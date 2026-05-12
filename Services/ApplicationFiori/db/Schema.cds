namespace Data;

entity Products {
    key ID : String;
    productName : String;
    stock : Integer;
    orderitem : Association to many OrderItems on orderitem.product = $self;
}


entity Customers {
    key ID : String;
    customerName : String;
    address : String;
    order : Association to many Orders on order.customer = $self;
}

entity Orders {
    key ID : String;
    orderNumber : String;
    date : Date;
    time : Time;
    status : String;
    totalPrice : Decimal;
    customer : Association to Customers;
    orderItem : Composition of many OrderItems on orderItem.order = $self;
}

entity OrderItems {
    key ID : String;
    quantity : Integer;
    unitPrice : Decimal;
    totalPrice : Decimal;
    order : Association to Orders;
    product : Association to Products;
}
