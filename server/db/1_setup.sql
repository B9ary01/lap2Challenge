DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id serial PRIMARY KEY,
    title varchar(60) NOT NULL,
    name varchar(50) NOT NULL,
    post varchar(700) NOT NULL
);