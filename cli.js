
// Connection to DB
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "eTracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startProgram();
});

function startProgram() {
    inquirer.prompt({

        type: "list",
        name:"actions",
        message: "What would you like to do?",
        choices: ["View all employees", "View employees by departments", "View all employees by managers", "Add Employee", "Remove Employee", "Update employee role", "Update employee manager"]
    })

    .then(function(answer) {
        switch (answer.actions) {
            case "View all employees":
                viewEmployees();
                break;

            case "View employees by departments":
                employeeByDept();
                break;

            case "View all employees by managers":
                employeesByMgr();
                break;

            case "Add Employee":
                addEmployee();
                break;
            
            case "Remove Employee":
                remEmployee();
                break;
        
        // case "exit":
        //     connection.end();
        //     break;
        } 
    });  
};
function viewEmployees() {
    connection.query("SELECT employee_table.id, employee_table.first_name, employee_table.last_name, role_table.title, department_table.dept_name AS department, role_table.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee_table LEFT JOIN role_table ON employee_table.role_id = role_table.id LEFT JOIN department_table on role_table.department_id = department_table.id LEFT JOIN employee_table manager ON manager.id = employee_table.manager_id ORDER BY employee_table.id;", function (err, res) {
        if(err) throw err;
        console.table(res);
    });
    startProgram(); 
};

function employeeByDept() {
    connection.query("SELECT employee_table.id, employee_table.first_name, employee_table.last_name, role_table.title, department_table.dept_name AS department FROM employee_table LEFT JOIN role_table ON employee_table.role_id = role_table.id LEFT JOIN department_table ON department_table.id = role_table.department_id ORDER BY role_table.title;", function (err, res) {
        if(err) throw err; 
        console.table(res);   
    });
    startProgram();
};

function employeesByMgr() {
    connection.query("SELECT employee_table.id, employee_table.first_name, employee_table.last_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee_table LEFT JOIN employee_table manager ON manager.id = employee_table.manager_id ORDER BY manager;", function(err,res) {
    if(err) throw err;
    console.table(res);
    });
    startProgram();
}

function addEmployee() {
    inquirer.prompt ([
        {   type:"input",
            name:"first_name",
            message:"Employee first name?",
        },
        {
            type: "input",
            name: "last_name",
            message: "Employees last name?",
        },
        {
            type: "input",
            message: "What is the Employees Role ID?",
            name: "role_id",
            // choices: [
            //     "1 - Sales Lead",
            //     "2 - Salesperson",
            //     "3 - Lead Engineer",
            //     "4 - Software Engineer",
            //     "5 - Account Lead",
            //     "6 - Accountant",
            //     "7 - Legal Team Lead",
            //     "8 - Lawyer"
            // ]
        },
    ])
    .then(function(answer) {
            
        var firstName = answer.first_name;
        var lastName = answer.last_name;
        var roleID = answer.role_id;
        var managerID = answer.manager_id;

        var query = "INSERT INTO employee_table (first_name, last_name, role_id, manager_id) VALUES ?";
        connection.query(query, [[[firstName, lastName, roleID, managerID]]], function (err, res) { 
        if (err) throw err;
        
        console.table(`New entry added ${firstName, lastName, roleID} to database.`);
        });
        startProgram();
        
    });

};

function remEmployee() {
    inquirer.prompt([
            {
                name: "remEmployee",
                type: "input",
                message: "what is the employee's id number?"
            },
        ])
        .then(function (answer) {
            console.log(answer);
            let query = "DELETE FROM employee_table WHERE ?";
            let newId = Number(answer.remEmployee);
            
            console.log(newId);
            connection.query(query, { id: newId }, function (err, res) {
                
            });
            startProgram();
        });
};



// con.connect(function (err) {
//     if (err) throw err;
//     var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("Number of records deleted: " + result.affectedRows);
//     });
// });

// /         .then(res => {
//             let roleNum = parseInt(res.role_id.charAt(0));
//             console.log(roleNum);
//             let ifManager = null;
//             if (roleNum === 2 || 4 || 6 || 8) {
//                 inquirer
//                     .prompt([
//                         {
//                             type: "list",
//                             message: "Who is the employees manager?",
//                             name: "manager",
//                             choices: managerQuery()
//                         }
//                     ])
//                     .then(res => {
//                         ifManager = res.manager;
//                     });
//             }
//             // This add query is not working
//             const queryString = `INSERT INTO employee_table (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;
//             connection.query(
//                 queryString,
//                 [res.fn, res.ln, roleNum, ifManager],
//                 function (err, res) {
//                     if (err) throw err;
//                     console.table("Employee Added!");
//                     start();
//                 }
//             );
//         });
// }

