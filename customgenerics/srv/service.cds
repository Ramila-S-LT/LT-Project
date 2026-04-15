namespace student.srv;

using {student.db as db} from '../db/schema';

service studentAPI{
    entity Students as projection on db.Student;
}

