/* Replace with your SQL commands */
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    description text,
    rate float NULL,
    image text,
    user_id bigint REFERENCES users(id) NOT NULL,
    category_id bigint REFERENCES categories(id) NOT NULL
);