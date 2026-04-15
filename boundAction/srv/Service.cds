using {db as DB} from '../db/Schema';

service MyService {
    entity Students as projection on DB.Students actions {
        action update() returns Students;
        function calculate() returns Students;
    };


    entity Courses as projection on DB.Courses;
}