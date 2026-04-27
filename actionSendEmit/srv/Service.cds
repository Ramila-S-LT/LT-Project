namespace sendEmitActions.srv;

using {sendEmitActions as db} from '../db/Schema';

service api {
    entity Sample as projection on db.Sample;

    action updateCourse(ID : String, Course_Name : String, Amount: String) returns array of String;
    action updateAmount(ID : String, Amount : String) returns array of String;


    action ReUpdateName(ID : String, Name : String, Course_Name : String) returns array of String;
    action ReUpdateCourse(ID: String, Course_Name: String) returns array of String;
}