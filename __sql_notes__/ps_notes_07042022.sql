USE classicmodels;

-- PRACTICES
-- GET customers, its order (qty, status, product name_
SELECT cs.customerNumber, cs.customerName,
od.status, od.orderDate,
ol.quantityOrdered,
pd.productName
FROM customers AS cs
JOIN orders AS od ON od.customerNumber = cs.customerNumber
JOIN orderdetails AS ol ON ol.orderNumber = od.orderNumber
JOIN products AS pd ON pd.productCode = ol.productCode;

-- GET top 10 data employee with highest total credit limit from customers
SELECT em.firstName, em.lastName,
SUM(cs.creditLimit) total_credit
FROM employees AS em
JOIN customers AS cs ON cs.salesRepEmployeeNumber =  em.employeeNumber
GROUP BY em.employeeNumber
ORDER BY total_credit DESC
LIMIT 10;

-- GET top 10 best selling product
SELECT pd.productName, SUM(od.quantityOrdered) total_ordered
FROM orderdetails AS od
JOIN products AS pd ON pd.productCode =  od.productCode
GROUP BY pd.productCode
ORDER BY total_ordered DESC
LIMIT 10;

-- GET top 10 customers with highest buy
SELECT cs.customerNumber, cs.customerName, SUM(ol.quantityOrdered) total_ordered
FROM orders AS od
JOIN customers AS cs ON cs.customerNumber = od.customerNumber
JOIN orderdetails AS ol ON ol.orderNumber = od.orderNumber
GROUP BY cs.customerNumber
ORDER BY total_ordered DESC
LIMIT 10;
