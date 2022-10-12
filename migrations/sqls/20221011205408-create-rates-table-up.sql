/* Replace with your SQL commands */
CREATE TABLE rates (
    id SERIAL PRIMARY KEY,
    rate float NOT NULL,
    user_id bigint REFERENCES users(id) NOT NULL,
    movie_id bigint REFERENCES movies(id) NOT NULL
);