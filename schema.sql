-- Create bamazon database
CREATE DATABASE bamazon;
-- Select bamazon database for action
USE bamazon;
-- Create products table
CREATE TABLE products (
item_id INT (10) AUTO_INCREMENT NOT NULL,
product_name VARCHAR (100) NOT NULL,
department_name VARCHAR (100) NOT NULL,
price DECIMAL (10, 2) NOT NULL,
stock_quantity INT (10) NOT NULL,
PRIMARY KEY (item_id)
);
-- Add product_sales to products table for Challenge #3
ALTER TABLE products
ADD product_sales INT (10) NOT NULL 
AFTER stock_quantity; 
-- Create department table
CREATE TABLE departments (
department_id INT (10) AUTO_INCREMENT NOT NULL,
department_name VARCHAR (100) NOT NULL,
over_head_costs INT (10) NOT NULL,
PRIMARY KEY (department_id)
);
