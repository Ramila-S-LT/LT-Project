namespace student.srv;

using {students.db as db} from '../db/schema';

service studAPI {
    entity Studs as projection on db.Student;
    entity bk as projection on db.books;
}