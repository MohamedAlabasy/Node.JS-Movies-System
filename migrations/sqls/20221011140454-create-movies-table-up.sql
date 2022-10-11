/* Replace with your SQL commands */
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    description text,
    rate integer DEFAULT 0,
    image text
);