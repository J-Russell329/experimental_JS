-- write your queries here

SELECT * FROM owners o LEfT JOIN vehicles v ON o.id = v.owner_id;

SELECT first_name, last_name, count(*) FROM owners o JOIN vehicles v ON o.id = v.owner_id GROUP BY o.id ORDER BY count(*) ASC;

SELECT o.first_name, o.last_name, avg(v.price) AS average_price, count(*) AS count FROM vehicles v JOIN owners o ON v.owner_id = o.id GROUP BY o.id HAVING avg(v.price) > 10000 ORDER BY count DESC;