
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
        choices: ["View all employees", "View employees by departments", "View all employees by managers", "Add Employee", "Add employee", "Update employee role", "Update employee manager", "Exit"]
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
        
        case "exit":
            connection.end();
            break;
        } 
    });  
};
function viewEmployees() {
    connection.query("SELECT * FROM employee_table", function (err, res) {
        if(err) throw err;
        console.table(res);
    });
    startProgram(); 
};

function employeeByDept() {
    connection.query("SELECT * FROM department_table", function (err, res) {
        if(err) throw err; 
        console.table(res);   
    });
    startProgram();
};

function employeesByMgr() {
    connection.query("SELECT * FROM employee_table where manager_id IS NOT NULL", function(err,res) {
    if(err) throw err;
    console.table(res);
    });
}
