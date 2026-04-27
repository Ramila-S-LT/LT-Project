const cds = require('@sap/cds');
const { UPDATE } = require('@sap/cds/lib/ql/cds-ql');

module.exports = cds.service.impl(async function() {

    const {Sample} = this.entities;

    console.log("Inside service implementation");

    //Send return the data 
    //Emit does not send the data 
    
    this.on('updateCourse', async (req) => {
        //console.log("HI");
        
        const {ID, Course_Name, Amount} = req.data;
        // console.log("Course name : ", Course_Name);
        // console.log("Amount : ", Amount);
        
        
        const data = await UPDATE(Sample).set({Course_Name : Course_Name}).where({ID : ID});
        //console.log(data);

        const senddata = await this.send({event: 'updateAmount' , data : {ID : ID, Amount : Amount}});

        console.log("Data Updated Successfully");
        
    })

    this.on('updateAmount', async (req) => {

        //console.log("Update Amount");
        
        const {ID, Amount} = req.data;
        // console.log("ID :", ID );
        // console.log("Amount : ", Amount);
        
        
        const Amountdata = await UPDATE(Sample).set({Amount : Amount}).where({ID});
        //console.log(Amountdata);
        return Amountdata;
        
    })


    //EMIT

    this.on('ReUpdateName', async (req) => {
        const {ID, Name, Course_Name} = req.data;
        console.log(ID);
        console.log(Name, Course_Name);
        
        

        const data = await UPDATE(Sample).set({Name : Name}).where({ID});
        console.log(data);

        const emitdata = await this.emit({event : 'ReUpdateCourse', data : { ID : ID, Course_Name : Course_Name }});
        //console.log(emitdata);
        
    })

    this.on('ReUpdateCourse', async (req) => {
        const {ID, Course_Name} = req.data;
        console.log("Course ID : ", ID);
        console.log("Course Name : ", Course_Name);
        

        const data = await UPDATE(Sample).set({Course_Name : Course_Name}).where({ID});
        console.log("Data :" , data);

        //Does not return the data... 
       //return data;

        
    })
})