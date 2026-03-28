
service ToDoTaskService {

    function getToDos(id: Integer) returns array of {
        userId : Integer;
        id : Integer;
        title : String;
        completed : Boolean;
    };

    action createToDos(userId : Integer, title : String, completed : Boolean) returns {
        userId : Integer;
        id : Integer;
        title : String;
        completed : Boolean;
    }
}