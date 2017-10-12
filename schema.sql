CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT (10) AUTO_INCREMENT NOT NULL,
product_name VARCHAR (100) NOT NULL,
department_name VARCHAR (100) NOT NULL,
price DECIMAL (10, 2) NOT NULL,
stock_quantity INT (10) NOT NULL,
PRIMARY KEY (item_id)
);


ALTER TABLE products
ADD product_sales INT (10) NOT NULL 
AFTER stock_quantity; 

CREATE TABLE departments (
department_id INT (10) AUTO_INCREMENT NOT NULL,
department_name VARCHAR (100) NOT NULL,
over_head_costs INT (10) NOT NULL,
PRIMARY KEY (department_id)
);



SELECT departments.department_id, departments.department_name, departments.over_head_costs, 
products.product_sales - departments.over_head_costs AS total_profit
FROM departments 
INNER JOIN products ON products.product_sales
AND products.product_sales - departments.over_head_costs AS total_profit;