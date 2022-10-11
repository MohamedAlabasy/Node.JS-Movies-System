/* Replace with your SQL commands */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) ,
    password VARCHAR NOT NULL,
    is_verification BOOLEAN DEFAULT FALSE
);