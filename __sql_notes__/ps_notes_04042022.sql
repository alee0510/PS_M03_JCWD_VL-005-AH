USE classicmodels;
SHOW TABLES;

-- BASIC QUERY
SELECT * FROM customers ORDER BY customerName;
SELECT * FROM employees;
SElECT * FROM offices;
SELECT * FROM orders;
SELECT * FROM orderdetails;
SELECT * FROM products;
SELECT * FROM productlines;

-- PRACTICES
-- 1.1 GET customer top 10 customer credit limit
-- 1.2 GET average customer credit limit for each country / city order by credit limit
-- 1.3 GET highest customer credit limit for each country / city order by credit limit