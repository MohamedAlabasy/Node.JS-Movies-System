/* Replace with your SQL commands */
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    user_id bigint REFERENCES users(id) NOT NULL
);