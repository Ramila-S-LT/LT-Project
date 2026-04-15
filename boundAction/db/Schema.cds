namespace db;

entity Students {
    key ID : String;
    Student_Name : String;
    Dept : String;
    Fee_Status : String;
    junc : Association to many Junction on junc.Stud_ID = $self;
}

entity Courses {
    key ID : String;
    Course_Name : String;
    junc : Association to many Junction on junc.Course_ID = $self;
}

entity Junction {
    Key Stud_ID : Association to Students;
    key Course_ID : Association to Courses;
}