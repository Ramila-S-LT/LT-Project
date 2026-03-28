namespace hospitalentity.srv;

using {Hospitaldb as db} from '../db/HospitalSchemaFinal';

service HospitalAPI {
    entity hospital as projection on db.Hospital;
    entity department as projection on db.Department;
    entity doctor as projection on db.Doctor;
    entity receptionist as projection on db.Receptionist;
    entity patient as projection on db.Patient;
    entity appointment as projection on db.Appointment;
    entity PatientRecord as projection on db.PatientRecord;
    entity prescription as projection on db.Prescription;
    entity labtest as projection on db.LabTest;
    entity billing as projection on db.Billing;
    entity payment as projection on db.Payment;
    entity nurse as projection on db.Nurse;
    entity ward as projection on db.Ward;
    entity PresLineItem as projection on db.PresLineItem;
    entity Medicine as projection on db.Medicine;


    //Functions

    function getTotalDepartments() returns Integer;
    function doctorAppointments(id: String) returns Integer;
    function getUpcomingAppointments(id: String, Status: String) returns Integer;


    //ACTIONS

    action approveAppointment(ID : String) returns String;
    action cancelAppointment(ID : String) returns String;
    action generateBill(ID : String) returns String;
}