
import { question } from "readline-sync";
let students = [{roll_No :101,name : "Renuka",class : 5,gender : "female",test_score :[],test_marks :0,percentage :0},
{roll_No :102,name : "Haritha",class : 6,gender : "female",test_score :[],test_marks :0,percentage : 0},
{roll_No :103,name : "mani",class : 7,gender :"male",test_score : [],test_marks :0,percentage :0},
{roll_No :104,name : "Madhura",class : 8,gender :"female",test_score : [],test_marks :0,percentage :0},
{roll_No : 105,name : "prasadh",class : 9,gender :"male",test_score : [],test_marks :0,percentage :0},
{roll_No :106,name : "Ashu",class :6,gender :"female",test_score :[],test_marks : 0,percentage :0},
{roll_No : 107, name :"pavan",class : 6,gender : "male",test_score : [],test_marks : 0,percentage : 0},
{roll_No : 108,name: "Arun",class :6,gender : "male",test_score : [],test_marks : 0,percentage:0}
];


function menu (){
    console.log (`*****  Menu ****\n
        1)Take Test \n
        2) view Result \n
        3)view All results \n
        4) classResult \n
        5) Detail Analysis \n
        6)view to 3 performers \n
        7) exit `);
        const user = parseInt(question ("Enter your option : "));
        switch (user) {
            case 1 :
                TakeTest();
                break;
                case 2 :
                   viewResult() ;
                break;
                case 3 :
                    viewAllResults();
                    break;
                    case 4 :
                        classResult();
                        break;
                        case 5 :
                            DetailAnalysis();
                            break;
                            case 6:
                                TopPerformer();
                                break;
                default :
            console.log ("Invalid input : ")
            menu();
        }
}
const subjects = ["maths", "English","science"];

 function randomMark (){
    return Math.floor(Math.random() *100);
 }
  function TakeTest (){
    for (const student of students){
        student.test_score = [];
        for (const subject of subjects){
student.test_score.push({
    subject : subject,
    marks : randomMark()
});
        }
    }
    console.log ("test score generated successfully");
    menu();
  }

  function viewResult (){
for (let student of students){
    //if (student.total === undefined){
        student.total =0;
        for (const score of student.test_score){
            student.total += score.marks;
        }
        student.percentage = (student.total/(subjects.length * 100))*100;
    
    console.log (`\n
        +--------+----------+----------+
        |student | total   |percentage |
        +--------|-----------+----------+
        |${ student.name}  | ${student.total}   | ${student.percentage.toFixed(2)} %    |`)
        
}
console.log ("Results generated");
menu();
  }
  
  function viewAllResults (){
    if (students[0].total === 0 ){
console.log ("please take test  to generate results");
menu();
    }
 console.log ("generate Results");
 console.log (`\n
    +--------+-------+--------+---------+------------+
    | roll_No| class | name  | total    |percentage  |
    +---------+------+---------+---------+------------+
    `);
    for (const student of students){
        console.log(`
|${student.roll_No.toString().padEnd(8)} |${student.class.toString().padEnd(5)} | ${student.name.padEnd(14)} |${student.total.toString().padEnd(11)} | ${student.percentage.toFixed(2).padEnd(10)}|
            `);
    }
console.log ("-----------------------------");
menu();
  }
  
  function classResult (){
    const classNumber = parseInt(question("Enter a class Number for view Results : "));
    console.log ("Results for class Number")
    console.log (`\n
        +----------+----------+----------+--------------+
        |name      | class    | total    |percentage  |
        +----------+-----------+----------+-------------+
        `);
        let found = false;
        for (const student of students){
            if (student.class === classNumber){
                found = true;
                console.log (`
                    |${student.name.padEnd(8)}  | ${student.class.toString().padEnd(5)} |${student.total.toString().padEnd(11)} | ${student.percentage.toFixed(2).padEnd(10)}|`
                );
            }
        }
       
        if (!found){
            console.log ("No results found")
        } 
        console.log ("---------------------");
        menu();
  }

function DetailAnalysis (){
    const classResult = {};
    for (const student of students){
        const studentclass = student.class;
        if (!classResult[studentclass]){
            classResult[studentclass] = {
                totalStudents :0,
                totalmarks :0,
                totalPercentage :0,
                failedcount :0,
                passescount :0,

            };
        }
        classResult[studentclass].totalStudents++;
        classResult[studentclass].totalmarks += student.total;
        classResult[studentclass].totalPercentage += student.percentage;

        if (student.percentage <36) {
            classResult[studentclass].failedcount++;
        } else {
           classResult[studentclass].passescount++;
        }
    }
    console.log (`\n
+------+--------------+--------------+---------------+-------+------------+----------+-------------+---------+
|class |totalStudents |Avg totalmarks| Avg percentage| Grade  |failedcount |fail%     |passescount |pass%    |
+------+--------------+---------------+---------------+-------+------------+----------+------------+----------+
        `);
        for (let studentclass in classResult){
let Result = classResult[studentclass];
let totalStudents = Result.totalStudents;
let failedcount = Result.failedcount;
let passescount = totalStudents - failedcount;
let failed= (failedcount/ totalStudents)*100;
let passed =(passescount/ totalStudents)*100;


const avgmarks = Result.totalmarks/Result.totalStudents;
const avgpercent = Result.totalPercentage / Result.totalStudents;
const Grade = getGrade(avgpercent);

console.log (`|${studentclass.toString().padEnd(5)} | ${totalStudents.toString().padEnd(12)} |${avgmarks.toFixed(2).toString().padEnd(13)} | ${avgpercent.toFixed(2).toString().padEnd(14)} |${Grade.padEnd(5)} |${failedcount.toString().padEnd(13)} | ${failed.toFixed(2).toString().padEnd(8)} |${passescount.toString().padEnd(7)} | ${passed.toFixed(2).toString().padEnd(8)} |`);
        }
console.log ("------------------------------");
menu();
}


function getGrade (avgpercent){
  
if (avgpercent >=90) return 'A+';
if (avgpercent >= 80 && avgpercent <90) return 'A';
if (avgpercent >= 70 && avgpercent < 80 ) return 'B+';
if (avgpercent >60 && avgpercent < 70) return 'B';
if (avgpercent >45 && avgpercent<60 ) return 'c'

return 'F';

}


function TopPerformer (){
    console.log("**** Classwise Top Performers ****");

    const classperform = {};

    students.forEach(student => {
        if (!classperform[student.class]) {
            classperform[student.class] = [];
        }
        classperform[student.class].push(student);
    });

    for (let cls in classperform) {
        let studentsInClass = classperform[cls];
studentsInClass.sort((a,b)=> b.total - a.total);

        let topPerformers = studentsInClass.slice(0, 3);

        console.log("==================================================================")
        console.log(`\nClass ${cls} Top Performers:`);
        topPerformers.forEach((student, index) => {
            console.log(`\n
                +--------+-------------+-------+
                | Rank   |    Name     | Marks |
                +--------+-------------+-------+\n\
                |    ${index + 1}   |  ${student.name}        | ${student.total}   |`);                       
                
        });
    }

menu();
}
menu();
