const cds = require('@sap/cds');
const { SELECT, UPDATE } = require('@sap/cds/lib/ql/cds-ql');

module.exports = cds.service.impl(async function(){

    const {hospital, department, doctor, receptionist, patient, appointment, PatientRecord, prescription, PresLineItem, Medicine, labtest, billing, payment, nurse, ward} = this.entities;


    //HOSPITAL
    this.before('CREATE', hospital, async (req) => {

        const {ID, ContactNo} = req.data;

        if(ContactNo.length !== 10){
            req.error('Contact Number should be length in 10')
        }

        const exists = await SELECT.one.from(hospital).where({ID});

        if(exists) {
            req.error(400, `Hospital with ID ${ID} already exists`);
        }
    });

    
    this.before('DELETE', hospital, async (req) => {

        const {ID} = req.data;

        const deptExists = await SELECT.one.from(department).where({HospialID : ID});

        if(deptExists) {
            req.error(400, `Cannot delete hospital... department exists`)
        }

    });

    this.after('CREATE', hospital, async (req) => {

        return `Hospital inserted succesfully`;
    })

    //DEPARTMENT
    this.before('CREATE', department, async (req)=>{

        const {name, HospialID_ID} = req.data;

        const existsName = await SELECT.one.from(department).where({name : name, HospialID_ID : HospialID_ID});

        if(existsName){
            req.error(`Department ${name} is already exists`);
        }
    });


    //DOCTOR
    this.before('CREATE', doctor, async (req)=>{
        const {Experience} = this.entities;

        if(Experience <= 0){ //convert string to integer
            req.error(`Experience should not be less than or equal to ${Experience}`);
        }

    });



    //PATIENT
    this.before('CREATE', patient, async (req) => {
        if(!req.data.Status) {
            req.data.Status = "Active";
        }
    });


    //APPOINTMENT
    // this.before('CREATE', appointment, async (req) => {

    //     const {docID, Date, Time} = req.data;

    //     const exists = await SELECT.from(appointment).where({docID_ID : docID, Date : Date, Time : Time});

    //     if(exists){
    //         req.error(`No Double entry`);
    //     }

    // })



    //not working
    this.after('CREATE', appointment, async (req, data) => {
            data.Msg = `Successfully Bookd the appointment for ${data.name}`;

            return data;
    })



//Implement the actions for change the status to completed.....


    //PATIENT RECORD
    this.before('CREATE', PatientRecord, async(req) => {

        const {AptID_ID} = req.data;

        if(!req.data.Next_Visit_Date){
            req.data.Next_Visit_Date = null;
        }

        const appointmentexists = await SELECT.one.from(appointment).where({ID : AptID_ID});

        if(appointmentexists.Status !== 'Completed'){
            req.error('Patient Record will be able to create once the appointment status is in completed State')
        }
    })







    //PATIENT
        this.before('CREATE', patient, async (req) => {

        const {ID} = req.data;

        const exists = await SELECT.one.from(patient).where({ID});

        if(exists) {
            req.error(400, `Patient with ID ${ID} already exists`);
        }
    });



    //generate the bill with prescriptions............
    //BILLING

    // this.on('CREATE', billing, async (req, next) => {

    //     const {AptID_ID } = req.data;

    //     const appointmentdata = await SELECT.one.from(appointment).where({ID : AptID_ID});
        
    //     if(appointmentdata.Consultation_Fee > 0){
    //         req.data.Amount = appointmentdata.Consultation_Fee;
    //         req.data.Bill_Status = "Generated";
    //     }

    //     await next();

    // });


    this.on('UPDATE', prescription, async (req) => {
        
        const {ID} = req.data;

        const MedicineList = await SELECT.from(PresLineItem).where({prescription_ID : ID});

        console.log(MedicineList[0]);
        console.log("Frequency",MedicineList[0].Frequency);

        let amount = 0, medicine_Quantity =0, medicine_Cost=0;
        for(const ele of MedicineList){

            //console.log(ele);

            const sample = ele;
            //console.log(sample.Medicine_Name);

            medicine_Quantity = sample.quantity;
            //console.log(medicine_Quantity);
            

            let ID = sample.medicine_ID;

            const medicinecost = await SELECT.from(Medicine).where({ID : ID});
            //console.log(medicinecost);

            let medicine_Cost = medicinecost[0].Cost;

            amount += (medicine_Quantity * medicine_Cost);
            
        }
        console.log("Total amount", amount);


        await UPDATE(prescription).set({totalAmount : amount}).where({ID : ID});

    })



    this.on('CREATE', billing, async(req, next)=>{


        //const {ID} = req.data;

        if(!req.data.Amount || !req.data.Bill_Status){
            req.data.Amount = 0;
            req.data.Bill_Status = "Pending";


        }

        await next();

        //const {AptID_ID, LabID_ID} = req.data;

        // //appointment
        // const appointmentFees = await SELECT.from(appointment).where({ID : AptID_ID});

        // //Appointment Details
        // console.log(appointmentFees[0].Consultation_Fee);

        // //LabTest
        // const LabTestFees = await SELECT.from(labtest).where({ID : LabID_ID});

        // //Lab Test Details
        // console.log(LabTestFees[0].Cost);   
        
        //const presAmount = await SELECT.from(prescription).where({ID : })
        
    } )

    this.on('generateBill', async (req) => {

    
        const {ID} = req.data;
        console.log(ID);
        

        const getdetails = await SELECT.from(billing).where({ID});
        console.log(getdetails);
        

        const AptID_ID = getdetails[0].AptID_ID;
        console.log(AptID_ID);
        
        const LabID_ID = getdetails[0].LabID_ID;
        console.log(LabID_ID);
        
        const PresID_ID = getdetails[0].PresID_ID;
        console.log(PresID_ID);
        

        const appointmentFees = await SELECT.from(appointment).where({ID : AptID_ID});
        console.log(appointmentFees);
        
        const labtestFees = await SELECT.from(labtest).where({ID : LabID_ID});
        console.log(labtestFees);
        
        const prescriptionFees = await SELECT.from(prescription).where({ID : PresID_ID});
        console.log(prescriptionFees);
        

        const totalBillAmount = appointmentFees[0].Consultation_Fee + labtestFees[0].Cost + prescriptionFees[0]. totalAmount;

        
        await UPDATE(billing).set({Amount : totalBillAmount, Bill_Status : "Generated" }).where({ID});
        return `Bill successfully generated....`;


    })


    //RECEPTIONIST
    this.before('CREATE', receptionist, async (req) => {

        const {ID, Contant_No} = req.data;
        //console.log(Contact_No);

        
        if(Contant_No.length !== 10){
            req.error('Enter a valid Contact No');
        }

        if(!ID){
            req.error('ID for receptionist is mandatory');
        }

    })

    this.on('CREATE', receptionist, async (req, next) => {

        if(!req.data.Status){
            req.data.Status = "Active";
        }

        await next();
    })


    this.on('getTotalDepartments', async (req) => {

        const {department} = this.entities;

        const total_dept = await SELECT.from(department);

        return total_dept.length;

    });

    this.on('doctorAppointments', async (req) => {
        
        const {appointment} = this.entities;
        const {id} = req.data;

        const doctorappointment = await SELECT.from(appointment).where({docID_ID : id});

        return doctorappointment.length;

    })

    this.on('getUpcomingAppointments', async (req) => {

        const {appointment} = this.entities;
        const {id, Status} = req.data;

        const UpcomingTotalAppointmens = await SELECT.from(appointment).where({docID_ID : id, Status : Status });

        return UpcomingTotalAppointmens.length;
    })

    //calculate all the bill amount...

    //calculate how many doctors are available today.... and who are all they.... create one attendance entity.....
    //according to that we have to assign the doctor for patients.... 


    //ACTIONS

    this.on('approveAppointment', async (req) => {

        const {ID} = req.data;


        const Details = await SELECT.from(appointment).where({ID});

        //console.log(Details);
        
        if(Details.Status === "Booked"){

            await UPDATE(appointment).set({Status: 'Approved'}).where({ID});
            return `Appointment Approved Successfully`;

        }else {
            req.error(`Not updated`)
        }

    })


    //update the status once it is completed.....


    this.on('cancelAppointment', async (req) => {

            const {ID} = req.data;

            await UPDATE(appointment).set({Status: 'Cancelled'}).where({ID});
            return `Appointment Approved Successfully`;


    })







})