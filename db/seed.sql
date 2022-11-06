use employees_db;

INSERT INTO department
    (name)
VALUES
    ('Administration'),
    ('Engineering'),
    ('Human Resources'),
    ('Customer Service'),
    ("Accounting");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Administative Manager', 100000, 1),
    ('Administrative Analyst', 800000, 1),
    ('Lead Engineer', 135000, 2),
    ('Sofware Engineer', 110000, 2),
    ('HR Manager', 130000, 3),
    ('Recruiter', 75000, 3),
    ('Team Leader', 90000, 4),
    ('Customer Service Rep', 70000,  4),
    ('Account Manager', 150000, 5),
    ('Accountant', 120000, 5);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Errol', 'Smith', 1, NULL),
    ('Michael', 'Harrison', 2, 1),
    ('Iandra', 'Lodge', 3, NULL),
    ('Daniel', 'Vidal', 4, 3),
    ('James', 'Peterson', 5, NULL),
    ('Michaelia', 'Holmes', 6, 5),
    ('Cyanie', 'Matterson', 7, NULL),
    ('Tom', 'Brown', 8, 7),
    ('Xaria', 'Lodge', 9, NULL),
    ('Fiona', 'Johnson', 10, 9);