const logo = require('asciiart-logo');
const db = require ('./config/index')
const {prompt} = require("inquirer");
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
        name: "View Employees under given Manager",
        value: "View_Employees_By_Manager"
    },
    {
        name: "View Employees in given Department",
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
    },
    {
        name: "quit",
        value: "Quit"
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

// Function to load the questions
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
            // Case to see all departments
            case "View_Departments":
                db.viewAllDepartments()
                .then(([response]) => {
                    console.table(response);
                    loadPrompts();
                })
                break;
            // Case to view all roles
            case "View_Roles":
                db.viewAllRoles()
                .then(([response]) => {
                    console.table(response);
                    loadPrompts();
                })
                break;
            // Case to view all Employees
            case "View_Employees":
                db.viewAllEmployees()
                .then(([response]) => {
                    console.table(response);
                    loadPrompts();
                })
                break;
            // Case to add a new department
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
                    db.insertDepartment(name)
                    .then (() => {
                        console.log(`Added ${name} to the department table`);
                    })
                    .then (() => {
                        loadPrompts();
                    })
                })
                break;
            // Case to add a new role
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
                    db.viewAllDepartments()
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
                                db.insertRole(answerTitle, answerSalary, response.role)
                                .then (() => {
                                    console.log(`Added ${answerTitle} to the role table`)
                                    loadPrompts();
                                })
                            })
                            }
                            )
                        })
                break;
            // Case to add a new Employee
            case "Add_Employee":
                prompt([
                    {
                        type: "input",
                        message: "Enter Employee First Name",
                        name: "First_Name"
                    },
                    {
                        type: "input",
                        message: "Enter Employee Last Name",
                        name: "Last_Name"
                    }
                ])
                .then((response) => {
                const fName = response.First_Name;
                const lName = response.Last_Name;
                db.viewAllRoles()
                .then(([response])=> {
                    const roleChoices = response.map (({title, role_id}) => ({
                        name: title,
                        value: role_id
                    }))
                    prompt([
                        {
                            type: "list",
                            message: "Select Employee Role",
                            name: "role",
                            choices: roleChoices
                        }])
                        .then((response) => {
                            const selectedRole = response.role;
                            db.viewAllEmployees()
                            .then(([response]) => {
                                const managers = response.map(({id, first_name, last_name}) => ({
                                    name: first_name + " " + last_name,
                                    value: id
                                }))
                                prompt([
                                    {
                                        type: "list",
                                        message: "Select Employee's Manager",
                                        name: "manager",
                                        choices: managers
                                    }
                                ])
                                .then ((response) => {
                                    let manager = response.manager;
                                    db.insertEmployee(fName, lName, selectedRole, manager)
                                    .then(() => {
                                        console.log(`added ${fName} ${lName} to employee table`);
                                        loadPrompts();
                                    })
                                })
                            })
                        })
                    })
                })
                break;
            // Case to Update an Employee's Role
            case "Update_Employee_Role":
                db.viewAllEmployees()
                .then(([response]) => {
                    const employees = response.map (({id, first_name, last_name}) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }))
                    prompt([
                        {
                            name: "employee",
                            type: "list",
                            message: "Select Employee",
                            choices: employees
                        }
                    ])
                    .then ((response) => {
                        // const name = response.employee.name; 
                        const employee = response.employee;
                        console.log(employee)
                        db.viewAllRoles()
                        .then(([response]) => {
                            const roles = response.map(({role_id, title}) => ({
                                name: title,
                                value: role_id
                            }))
                            prompt([
                                {
                                    name: "role",
                                    message: "Select Employee's Role",
                                    type: "list",
                                    choices: roles
                                }
                            ])
                            . then ((response) => {
                                db.updateEmployeeRole(employee, response.role)
                                console.log(`Successfully changed Employee's role`)
                                loadPrompts();
                            })
                        })
                    })
                })
                break;
            // Case to Update an Employees Manager
            case "Update_Employee_Manager":
                db.viewAllEmployees()
                .then(([response]) => {
                    const employees = response.map (({id, first_name, last_name}) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }))
                    prompt([
                        {
                            type: "list",
                            message: "Select Employee",
                            name: "employee",
                            choices: employees
                        }
                    ])
                    .then ((response) => {
                        const employee = response.employee;
                        prompt([
                            {
                                type: "list",
                                message: "Select Manager",
                                name: "manager",
                                choices: employees
                            }
                        ])
                        .then ((response) => {
                            db.updateEmployeeManager(employee, response.manager)
                            console.log("Manager successfulyl changed")
                            loadPrompts();
                        })
                    })
                })
                break;
            // Case to View Employees by given manager
            case "View_Employees_By_Manager":
                db.viewAllEmployees()
                .then(([response]) => {
                    const managers = response.map (({id, first_name, last_name}) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }))
                    prompt([
                        {
                            type: "list",
                            message: "Whose employees would you like to see?",
                            name: "manager",
                            choices: managers
                        }
                    ])
                    .then ((response) => {
                        db.viewEmployeesByManager(response.manager)
                        .then(([response]) => {
                            if(response.length > 0){
                                console.table(response);
                                loadPrompts();
                            } else {
                                console.log("This person is not in charge of anyone");
                                loadPrompts();
                            }
                        })
                    })
                })
                break;
            // Case to view employees by given Department
            case "View_Employees_By_Department":
                db.viewAllDepartments()
                .then(([response]) => {
                    const departments = response.map (({id, name}) => ({
                        name: name,
                        value: id
                    }))
                    prompt ([
                        {
                            type: "list",
                            message: "Which department's workers would you like to see?",
                            name: "department",
                            choices: departments
                        }
                    ])
                    .then((response) => {
                        db.viewEmployeesByDepartment(response.department)
                        .then (([response]) => {
                            if (response.length >0){
                                console.table(response);
                                loadPrompts()
                            } else
                            {
                                console.log("There is no one in this department");
                                loadPrompts();
                            }
                        })
                    })
                })
                break;
            // Case to view total utilized budget of a given Department
            case "Total_Utilized_Budget":
                db.viewAllDepartments()
                .then(([response]) => {
                    const departments = response.map (({id, name}) => ({
                        name: name,
                        value: id
                    }))
                    prompt ([
                        {
                            type: "list",
                            message: "Which department's total utilized budget would you like to see?",
                            name: "department",
                            choices: departments
                        }
                    ])
                    .then ((response) => {
                        console.log(response.department);
                        db.totalUtilizedBudget(response.department)
                        .then(([response]) => {
                            console.table(response);
                            loadPrompts();
                        })
                    })
                })
                break;
            // Case to Delete an Employee
            case "Delete_Employee":
                db.viewAllEmployees()
                .then(([response]) => {
                    const employees = response.map (({id, first_name, last_name}) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }))
                    prompt([
                        {
                            name: "employee",
                            type: "list",
                            message: "Select Employee to delete",
                            choices: employees
                        }
                    ])
                    .then ((response) => {
                        db.deleteEmployee(response.employee);
                        console.log("Employee successfully deleted");
                        loadPrompts();
                    })
                })
                break;
            // Case to Delete a Department
            case "Delete_Department":
                db.viewAllDepartments()
                .then(([response]) => {
                    const departments = response.map (({id, name}) => ({
                        name: name,
                        value: id
                    }))
                    prompt([
                        {
                            name: "department",
                            type: "list",
                            message: "Select Department to delete",
                            choices: departments
                        }
                    ])
                    .then((response) => {
                        db.deleteDepartment(response.department);
                        console.log("Department successfully deleted");
                        loadPrompts();
                    })
                })
                break;
            // Case to Delete a Role
            case "Delete_Role":
                db.viewAllRoles()
                .then(([response]) => {
                    const roles = response.map (({role_id, title}) => ({
                        name: title,
                        value: role_id
                    }))
                    prompt([
                        {
                            name: "role",
                            type: "list",
                            message: "Select Role to delete",
                            choices: roles
                        }
                    ])
                    .then((response) => {
                        db.deleteRole(response.role);
                        console.log("Role successfully Deleted");
                        loadPrompts();
                    })
                })
                break;
            // Case to Exit program
            case "Quit":
                console.log("Goodbye!");
                process.exit();
        }
    })
}

// Function to start the app
init = () => {
    console.log(logo(logoText).render());
    loadPrompts();
}

init();