/* Replace with your SQL commands */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) ,
    is_verification BOOLEAN DEFAULT FALSE,
    password VARCHAR NOT NULL,
    birthday timestamp NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);