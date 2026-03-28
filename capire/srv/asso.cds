namespace assosrv.srv;

using {asso as db} from '../db/Association';

service associa {
    entity Address as projection on db.Address;
    entity Employees as projection on db.Employees;
    entity emp as projection on db.Emp;
    entity add as projection on db.add;

    entity students as projection on db.students;
    entity course as projection on db.course;

    entity studs as projection on db.studs;
    entity teachers as projection on db.teachers;
    entity junction as projection on db.junction;
}