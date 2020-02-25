INSERT INTO department_table
    (dept_name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal"),
    ("Accounting");

INSERT INTO role_table
    (title, salary, department_id)
VALUES
    ("Sales Lead", 100000, 1),
    ("Salesperson", 80000, 1),
    ("Lead Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Account Lead", 150000, 3),
    ("Accountant", 120000, 5),
    ("Legal Team Lead", 250000, 4),
    ("Lawyer", 180000, 4);

INSERT INTO employee_table
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Walt", "Disney", 1, null),
    ("Diane", "Disney", 2, 1),
    ("Barack", "Obama", 3, null),
    ("Oprah", "Winfrey", 4, 3),
    ("Brad", "Pitt", 5, null),
    ("Elvis", "Presley", 6, 5),
    ("Michael", "Jordan", 7, null),
    ("Consoleezza Rice", "Law", 8, 7);