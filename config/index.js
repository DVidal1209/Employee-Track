const connection = require ('./connection');


class DB {
    // connection reference
    constructor(connection) {
        this.connection = connection;
      }

      // View all Departments query
    viewAllDepartments = () => {
        return this.connection.promise().query(
            "SELECT id, name FROM department;"
        )
    }

    // View all Roles query
    viewAllRoles = () => {
        return this.connection.promise().query(
            "SELECT id AS role_id, title, department_id, salary FROM role"
        )
    }

    // View all Employees query
    viewAllEmployees = () => {
        return this.connection.promise().query(
            "Select employee.id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;"
        )
    }


    // Insert new Department query
    insertDepartment = (name) => {
        return this.connection.promise().query(
            "INSERT INTO department(name) VALUE (?)", [name]
        )
    }

    // Insert new role query
    insertRole = (title, salary, departmentId) =>{
        const input = [title, parseFloat(salary), parseInt(departmentId)];
        return this.connection.promise().query(
            "INSERT INTO role(title, salary, department_id) VALUES (?,?,?)", input
        );
    } 

    // Insert new employee query
    insertEmployee = (firstName, lastName, role, manager) => {
        const input = [firstName, lastName, role, manager];
        return this.connection.promise().query(
            "INSERT INTO employee(first_name, last_name, role, manager) VALUES (?,?,?,?)" , input
        );
    }

    // Update employee role query
    updateEmployeeRole = (employeeId, roleId) => {
        const input = [roleId, employeeId];
        return this.connection.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?",  input
        );
    }

    // Update Employee Manager query
    updateEmployeeManager = (employeeId, managerId) => {
        const input = [managerId, employeeId];
        return this.connection.promise().query(
            "UPDATE employee SET manager_id = ? WHERE id = ?",  input
        );
    }

    // Query to view Employees by Manager
    viewEmployeesByManager = (managerId) => {
        return this.connection.promise().query(
            "Select employee.id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id WHERE employee.manager_id = ?;", [managerId]
        )
    }

    // Query to view Employees by department
    viewEmployeesByDepartment = (roleId) => {
        return this.connection.promise().query(
            "Select employee.id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id WHERE department.id = ?", [roleId]
        )
    }

    // query to view total utilized budget for given department
    totalUtilizedBudget = (departmentid) => {
        return this.connection.promise().query =(
            "Select role.department_id, department.name AS department, SUM(role.salary) AS total_budget FROM Department JOIN role ON department.id = role.department_id WHERE role.department_id = ? GROUP BY role.department_id", [departmentid]
        )
    }

    // Delete Employee query
    deleteEmployee = (id) => {
        return this.connection.promise().query(
            "DELETE FROM employee WHERE employee_id = ?", [parseInt(id)]
        )
    }

    // Delete Department Query
    
    deleteDepartment = (id) => {
        return this.connection.promise().query(
            "DELETE FROM department WHERE id = ?", [parseInt(id)]
        )
    }

    // Delete role query
    deleteRole = (id) => {
        return this.connection.promise().query(
            "DELETE FROM role WHERE id = ?", [parseInt(id)]
        )
    }
}

module.exports = new DB(connection)