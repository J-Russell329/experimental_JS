-- Comments in SQL Start with dash-dash --
SELECT * FROM analytics WHERE id = 1880;

SELECT * FROM analytics WHERE last_updated = '2018-08-01';

SELECT category, count(*) FROM analytics GROUP BY category;

SELECT * FROM analytics ORDER BY reviews desc LIMIT 5;

SELECT * FROM analytics WHERE rating > 4.8 ORDER BY reviews desc LIMIT 1;

SELECT category, AVG(rating) AS avg_rating FROM analytics GROUP BY category ORDER BY avg_rating desc;

SELECT app_name,price,rating FROM analytics WHERE rating < 3  ORDER BY price desc LIMIT 1;

SELECT * FROM analytics WHERE min_installs < 50 ORDER BY rating desc;

SELECT * FROM analytics WHERE rating < 3 AND reviews > 1000;

SELECT * FROM analytics WHERE price BETWEEN .10 AND 1.00 ORDER BY reviews desc LIMIT 10;

SELECT * FROM analytics ORDER BY last_updated DESC LIMIT 1;

SELECT * FROM analytics ORDER BY price DESC LIMIT 1;

SELECT sum(reviews) FROM analytics;

SELECT category, count(*) as cate_size FROM analytics GROUP BY category HAVING count(*) > 300;

SELECT app_name, reviews, min_installs, min_installs / reviews AS min_install_review_ratio FROM analytics WHERE min_installs > 100000 ORDER BY min_installs / reviews LIMIT 1;