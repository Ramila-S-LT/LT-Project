namespace viewsample;

using {domainModeling as view} from './domain_modeling';


//View
entity Studs as select from view.Stud {
       key id : Integer,
        reg_no : LargeString,
        name
 }


//VIEWS

//  entity Salary_Details as select from view.Salary_Details{
//     ID,
//     name,
//     dept,
//     salary,
//     virtual Salary_with_Bonus : Integer
//  }


//Views with Parameters 

// @cds.persistence.skip
//  entity Sal (minSalary : Integer) as select from view.Salary_Details { 
//     Key ID,
//     name,
//     dept,
//     salary
//  }where salary > :minSalary;

//  entity HighPaid as select from Sal(minSalary: 17000);