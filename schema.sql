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

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Relatively Cool Einstein Socks", "Fashion", 12.34, 54),
("I Do What I Want Cat Mug", "Kitchen", 9.75, 4),
("POP Groot Vinyl Bobblehead", "Toys", 21, 545),
("Unicorn Portable Batery Charger", "Electronics", 14.52, 199),
("All My Friends are Dead, Hardcover", "Books", 10.95, 830),
("Tricera Taco, Taco Holder", "Kitchen", 13.49, 90),
("Elf Earbuds, Headphones", "Electronics", 17.80, 103),
("DJ Booth Cat Scratching Pad", "Pet", 27, 263),
("Show Me Your Kitties Mug", "Kitchen", 20.27, 52),
("R2-D2 USB Wall Charger", "Electronics", 17.82, 39);

USE bamazon;

CREATE TABLE departments (
department_id INT (10) AUTO_INCREMENT NOT NULL,
department_name VARCHAR (100) NOT NULL,
over_head_costs INT (10) NOT NULL,
PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUE ("Fashion", 2000),
("Kitchen", 3500),
("Toys", 1750),
("Electronics", 5300),
("Books", 1000),
("Pet", 400);

ALTER TABLE products
ADD product_sales INT (10) NOT NULL 
AFTER stock_quantity; 
