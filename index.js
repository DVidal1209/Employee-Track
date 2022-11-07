const logo = require('asciiart-logo');
const DB = require ('./config/index')
const {prompt, default: inquirer} = require("inquirer");
const questions = [
    {
        name: "View all Departments",
        value: "View_Departments"
    },
    {
        name: "View all Roles",
        value: "View_Roles"
    },
    {
        name: "View all Employees",
        value: "View_Employees"
    },
    {
        name: "Add a Department",
        value: "Add_Department"
    },
    {
        name: "Add a Role",
        value: "Add_Role"
    },
    {
        name: "Add an Employee",
        value: "Add_Employee"
    },
    {
        name: "Update an Employee's Role",
        value: "Update_Employee_Role"
    },
    {
        name: "Update an Employee's Manager",
        value: "Update_Employee_Manager"
    },
    {
        name: "View Employees sorted under given Manager",
        value: "View_Employees_By_Manager"
    },
    {
        name: "View Employees sorted in given Department",
        value: "View_Employees_By_Department"
    },
    {
        name: "View Total Budget for given department",
        value: "Total_Utilized_Budget"
    },
    {
        name: "Remove an Employee from the Database",
        value: "Delete_Employee"
    },
    {
        name: "Remove a Department from the Database",
        value: "Delete_Department"
    },
    {
        name: "Remove a Role from the Database",
        value: "Delete_Role"
    }
]

require("console.table");
// asciiart logo information
const logoText = {
        name: 'Employee Tracker',
        lineChars: 10,
        padding: 2,
        margin: 3,
        borderColor: 'grey',
        logoColor: 'burnt-orange',
}


loadPrompts = () => {
    prompt ([
        {
            type: "list",
            name: "selection",
            message: "What would you like to do?",
            choices: questions
        }
    ])
    .then((response) => {
        let selection = response.selection;
        switch (selection){
            case "View_Departments":
                DB.viewAllDepartments()
                .then(([response]) => {
                    console.table(response);
                    loadPrompts();
                })
                break;
            case "View_Roles":
                DB.viewAllRoles()
                .then(([response]) => {
                    console.table(response);
                    loadPrompts();
                })
                break;
            case "View_Employees":
                DB.viewAllEmployees()
                .then(([response]) => {
                    console.table(response);
                    loadPrompts();
                })
                break;
            case "Add_Department":
                prompt([
                    {
                        type: "input",
                        name: "Department",
                        message: "Enter Department Name"
                    }
                ])
                .then(async(response) => {
                    const name = response.Department;
                    DB.insertDepartment(name)
                    .then (() => {
                        console.log(`Added ${name} to the department table`);
                    })
                    .then (() => {
                        loadPrompts();
                    })
                })
                break;
            case "Add_Role":
                prompt([
                    {
                        type: "input",
                        name: "title",
                        message: "Enter Role Title"
                    },
                    {
                        type: "input",
                        name: "salary",
                        message: "Enter Role Salary"
                    },
                ])
                .then ((response) => {
                    let answerTitle = response.title;
                    let answerSalary = response.salary;
                    DB.viewAllDepartments()
                    .then(([response]) => {
                        const depChoices = response.map(({id, name}) => ({
                            name: name,
                            value: id
                        }))
                        prompt([
                            {
                                type: "list",
                                name: "role",
                                message: "Select Role Department",
                                choices: depChoices
                            }])
                            .then ((response) => {
                                DB.insertRole(answerTitle, answerSalary, response.role)
                                .then (() => {
                                    console.log(`Added ${answerTitle} to the role table`)
                                    loadPrompts();
                                })
                            })
                            }
                            )
                        })
                break;
            case "Add_Employee":
                break;
            case "Update_Employee_Role":
                break;
            case "Update_Employee_Manager":
                break;
            case "View_Employees_By_Manager":
                break;
            case "View_Employees_By_Department":
                break;
            case "Total_Utilized_Budget":
                break;
            case "Delete_Employee":
                break;
            case "Delete_Department":
                break;
            case "Delete_Role":
                break;
        }
    })
}

init = () => {
    console.log(logo(logoText).render());
    loadPrompts();
}

init();