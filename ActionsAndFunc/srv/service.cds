namespace myDB.srv;

using {mydb.db as db} from '../db/schema';

service employeeService {
    entity employees as projection on db.employee;

    function getAnnualSalary(id : String) returns Decimal(11,2);
}