BEGIN TRANSACTION;

CREATE TABLE likes (
id serial PRIMARY KEY,
post_id BIGINT NOT NULL,
username VARCHAR(100) NOT NULL,
timestamp BIGINT NOT NULL
);

COMMIT;