USE classicmodels;
SHOW TABLES;

-- PRACTICE
-- 1.1 GET data employee(name) plus total customer
SELECT em.employeeNumber,
CONCAT( em.firstName, ' ',em.lastName) employeeName, 
COUNT(cs.customerNumber) total_customer
FROM employees AS em
LEFT JOIN customers AS cs ON em.employeeNumber = cs.salesRepEmployeeNumber
GROUP BY em.employeeNumber;

-- 1.2 GET data employee(name) total customer, average credit limit, total credit limit
SELECT em.employeeNumber,
CONCAT( em.firstName, ' ',em.lastName) employeeName, 
COUNT(cs.customerNumber) total_customer,
AVG(cs.creditLimit) avg_credit,
SUM(cs.creditLimit) total_credit
FROM employees AS em
LEFT JOIN customers AS cs ON em.employeeNumber = cs.salesRepEmployeeNumber
GROUP BY em.employeeNumber;

-- 1.3 GET employe name with highest total customer for each country / city
SELECT employeeNumber, employeeName, country,
MAX(total_customer) AS max_total_customer
FROM (
	SELECT em.employeeNumber, CONCAT( em.firstName, ' ',em.lastName) employeeName, 
	COUNT(cs.customerNumber) total_customer,
	cs.country
	FROM employees AS em
	JOIN customers AS cs ON em.employeeNumber = cs.salesRepEmployeeNumber
	GROUP BY em.employeeNumber
) AS result
GROUP BY country;

-- 1.3 GET employee data with 0 customer
-- 1.4 GET employee data, job title, head/boss info, plus head/boss job title, order by highest total customer
-- 1.5 ...1.4 plus office city info for each employee