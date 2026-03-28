namespace domainModeling;

@cds.persistence.skip
entity Books {
    key ID : String;
    Book_Title : localized String;
    Author : localized String;
}

//Entity Defitions
@cds.persistence.skip
define entity Students {
    key ID : String;
    key Email : String;
    name : String;
    age : Integer;
}

//Type 

type User : String;

//Structured Type with types only

type Amount {
    value : Decimal;
    qty : Integer;
    currency : Integer;
}

@cds.persistence.skip
entity Price {
    key ID : String;
    price : Amount;
    referance : Currency;
}

//Structured with Relationship
@cds.persistence.skip
entity currencies {
    key ID : String;
    currency_State : String;
}

type Currency : Association to currencies;

//Projection types


type CustomerData : projection on Price {
    ID,
    price.value,
    price.qty as Quantity   
}

//ARRAY TYPED
@cds.persistence.skip
entity Foo {
    emails : many String;
}

//Anonymous Array Typed
@cds.persistence.skip
entity Bar {
    emails : many {
        kind : String;
        address : String;
    }
}

//Named Array Type 
@cds.persistence.skip
entity Car {
    emails : many EmailAddress;
}

type EmailAddress{
    kind : String;
    address : String;
}

//Virtual type
@cds.persistence.skip
entity Employees {
    key id : String;
    firstname : String;
    lastname : String;
    virtual fullname : String;
}

//Calculated type
@cds.persistence.skip
entity Emp {
    firstname : String;
    lastname : String;
    name : String = ( firstname || ' ' || lastname ) stored;
    address : String;
}

//Association like
@cds.persistence.skip
entity Emps {
    key id : String;
    address : Association to Address;
   // homeAddress = address [1:kind='home'];
}

@cds.persistence.skip
entity Address {
    key ID : String;
    city : String;
    kind : String;
    empsRefer : Association to many Emps on empsRefer.address = $self;
}


//DEFAULT VALUES
@cds.persistence.skip
entity Details {
    key ID : String;
    Age : Integer default 0;
    name : String default 'John';
}


//Default values in Type

type CreatedAt : Timestamp default $now;

type Complex {
    marks : Decimal default 0.0;
}

//Default values in enum

type Status : String enum {open; closed;};
@cds.persistence.skip
entity Orders {
    status : Status default #open;
}


//Type of Reference
@cds.persistence.skip
entity sample {
    key id : String;
    name : String;
    description : type of name;
}

//type of reference entity
@cds.persistence.skip
entity emplo {
    firstname : sample:name;
    lastname : sample : name;
}

//Constraints 
@cds.persistence.skip
entity sam {
    name : String not null;
}


//Enum type 

type Gender : String enum { male; female; non_binary = 'non-binary'};

//Entity
@cds.persistence.skip
entity user {
    key id : String;
    name : String;

    @Common.ValueList.entity: 'GenderCodes'
    @Common.ValueList.value: 'Code'
    @Common.ValueList.label: 'text'
    gender : Gender;
}

//Code list entity for enum localization
@cds.persistence.skip
entity GenderCodes {
    key Code : String;
    text : localized String;
}

// Domain Modelling
@cds.persistence.skip
entity Stud {
    key id : String;
    key reg_no : String;
    name : String;
    dept : String;
    courseRefer : Association to Courses;

}

@cds.persistence.skip
entity Courses {
    key ID : String;
    cour_name : String;
    studRefer : Association to many Stud on studRefer.courseRefer = $self;
}

//Entity for Virtual elements in views

entity Salary_Details {
    key ID : String;
    name : String;
    dept : String;
    salary : String;
}