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
SELECT *
FROM customers
ORDER BY creditLimit DESC
LIMIT 10;

-- 1.2 GET average customer credit limit for each country / city order by credit limit
SELECT country, city, AVG(creditLimit) AS avg_credit_limit
FROM customers
GROUP BY city
ORDER BY country ASC;

-- 1.3 GET highest customer credit limit for each country / city order by credit limit
SELECT country, city, MAX(creditLimit) AS highest_credit_limit
FROM customers
GROUP BY city
ORDER BY highest_credit_limit DESC;

-- 1.4 GET total customer for each country / city
-- 1.5 GET total customer credit limit for each country / city
-- 1.6 GET total customer, average credit limit, highest credit limit for each country / city