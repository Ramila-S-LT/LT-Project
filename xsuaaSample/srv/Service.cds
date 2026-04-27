using {xusaaDb as db} from '../db/Schema';

service xsuaaapi {
    entity Students @(restrict: [
        {
            grant : ['READ'],
            to:'Viewer'
        }, 
        {
            grant : ['*'],
            to:'Admin'
        },
        {
            grant : ['UPDATE'],
            to :'Manager'
        }
    ]) as projection on db.Students;

    entity Courses as projection on db.Courses;
}