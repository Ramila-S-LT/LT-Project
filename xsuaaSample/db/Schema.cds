namespace xusaaDb;

entity Students {
    key ID : String;
    stud_name : String;
    dept : String;
    course : Association to Courses;
}

entity Courses {
    key ID : String;
    course_name : String;
    course_Fee : String;
}