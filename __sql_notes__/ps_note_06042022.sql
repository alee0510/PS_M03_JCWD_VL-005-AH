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
SELECT em.employeeNumber, CONCAT(em.firstName, ' ' , em.lastName) employeeName,
COUNT(cs.customerNumber) total_customer
FROM employees AS em
LEFT JOIN customers AS cs ON cs.salesRepEmployeeNumber = em.employeeNumber
WHERE cs.customerNumber IS NULL AND em.jobTitle = 'Sales Rep'
GROUP BY em.employeeNumber;

-- 1.4 GET employee data, job title, head/boss info, plus head/boss job title, order by highest total customer
SELECT
em1.employeeNumber, 
CONCAT(em1.firstName, ' ' , em1.lastName) employeeNumber,
em1.jobTitle, 
CONCAT(em2.firstName, ' ', em2.lastName) head,
em2.jobTitle AS head_title,
COUNT(cs.customerNumber) total_customer
FROM employees AS em1
LEFT JOIN employees AS em2 ON em1.reportsTo = em2.employeeNumber
LEFT JOIN customers AS cs ON em1.employeeNumber = cs.salesRepEmployeeNumber
GROUP BY em1.employeeNumber
ORDER BY total_customer DESC;

-- 1.5 ...1.4 plus office city info for each employee
SELECT
em1.employeeNumber, 
CONCAT(em1.firstName, ' ' , em1.lastName) employeeNumber,
em1.jobTitle, 
CONCAT(em2.firstName, ' ', em2.lastName) head,
em2.jobTitle AS head_title,
COUNT(cs.customerNumber) total_customer,
oc.city
FROM employees AS em1
LEFT JOIN employees AS em2 ON em1.reportsTo = em2.employeeNumber
LEFT JOIN customers AS cs ON em1.employeeNumber = cs.salesRepEmployeeNumber
JOIN offices AS oc ON oc.officeCode =  em1.officeCode
GROUP BY em1.employeeNumber
ORDER BY total_customer DESC;

-- 1.6 GET customer data with their order info (status order, order date, order quantity, detail product, dll)
-- 1.7 GET employee plus total customer and total ordered product qty