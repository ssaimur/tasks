# tasks

to start the app
first run - npm istall
then - npm start

CREATE TABLE customers (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(30), phone VARCHAR(20), password VARCHAR(255), photo VARCHAR(30), address VARCHAR(100));

CREATE TABLE managers (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(30), phone VARCHAR(20), password VARCHAR(255), photo VARCHAR(30), address VARCHAR(100));

CREATE TABLE products (id INT PRIMARY KEY AUTO_INCREMENT, uploader_phone VARCHAR(20), product_name VARCHAR(60), category VARCHAR(30), product_picture VARCHAR(50), price VARCHAR(10), short_desc VARCHAR(120), additional_desc JSON, status VARCHAR(100) DEFAULT 'Active');
