USE classicmodels;
SHOW TABLES;

-- BASIC QUERY
SELECT * FROM customers ORDER BY salesRepEmployeeNumber;
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
SELECT country, city, count(*) AS total_customers
FROM customers
GROUP BY city
ORDER BY total_customers DESC;

-- 1.5 GET total customer credit limit for each country / city
SELECT country, city, SUM(creditLimit) AS total_credit
FROM customers
GROUP BY city
ORDER BY total_credit DESC;

-- 1.6 GET total customer, average credit limit, highest credit limit for each country / city
SELECT country, city, 
COUNT(*) AS total_customers, 
AVG(creditLimit) AS avg_credit, 
MAX(creditLimit) AS max
FROM customers
GROUP BY city
ORDER BY country;

-- HOMEWORK
-- 1.7 GET total sales_res for each country / city
SELECT country,
COUNT(salesRepEmployeeNUmber)total_sales
FROM customers
GROUP BY country
ORDER BY country;

-- 1.8 GET total customer credit, average credit limit, total customer for each sale_rep
SELECT
salesRepEmployeeNumber,
COUNT(customerName) total_customer,
AVG(creditLimit) avg_credit,
SUM(creditLimit) total_credit
FROM customers
GROUP BY salesRepEmployeeNumber;

-- 1.9 GET sale_rep with highest total customer for each country
SELECT 
sales,
country,
MAX(total_customer) max_customer
FROM (
	SELECT
	salesRepEmployeeNUmber AS sales,
	COUNT(customerNumber) total_customer, 
	country
	FROM customers
	GROUP BY salesRepEmployeeNumber
) AS sales_customers
GROUP BY country;

-- 2.0 GET sale_rep with highest earned customer credit limit for each country
SELECT 
sales, country, MAX(total_credit)
FROM (
	SELECT
	salesRepEmployeeNUmber AS sales,
	SUM(creditLimit) AS total_credit, 
	country
	FROM customers
	GROUP BY salesRepEmployeeNumber
) AS sales_customers
GROUP BY country;