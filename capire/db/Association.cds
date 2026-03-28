namespace asso;

entity Employees {
    key ID : String;
    name : String;
    addressRefer : Association to Address on addressRefer.ID = address_ID;
    address_ID : String;

}

entity Address {
    key ID : Integer;
    location : String;
    emp : Association to many Employees on emp.address_ID = ID;  //backlink
}

//Managed Associations

entity Emp {
    key id: String;
    name : String;
    addrefer : Association to add;
}

entity add {
    key ID : String;
    location : String;
}


entity students {
    key ID : String;
    name : String;
    courseRefer : Association to many course on courseRefer.studRefer = $self;
}

entity course {
    key ID : String;
    course_name : String;
    studRefer : Association to students;
}


entity studs {
    key ID : String;
    name : String;
    junctionRefer : Association to many junction on junctionRefer.studRefer = $self;

}

entity teachers {
    key ID : String;
    TH_name : String;
    junctionRefer : Association to many junction on junctionRefer.tecaherRefer = $self;

}

entity junction {
    key studRefer : Association to studs;
    key tecaherRefer : Association to teachers;
}