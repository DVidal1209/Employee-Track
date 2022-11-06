const connection = require ('./connection');

viewAllDepartments = () => {
    return this.connection.promise().query(
        "SELECT id, name FROM department"
    )
}

viewAllRoles = () => {
    return this.connection.promise().query(
        "SELECT id AS role_id, title, department_id, salary FROM role"
    )
}

viewAllEmployees = () => {
    return this.connection.promise().query(
        "Select employee.id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;"
    )
}