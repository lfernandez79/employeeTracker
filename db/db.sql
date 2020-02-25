-- Create DB
DROP_EXISTING IF EXISTS eTracker_db;
CREATE DATABASE eTracker_db;
USE eTracker_db

-- Create Tables
CREATE TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(40),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT null AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,4),
    department_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id),
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY(role_id) REFERENCES role_table(id),
    FOREIGN KEY(manager_id) REFERENCES employee_table(id)
);