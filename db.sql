-- To reset the database, run the command in terminal
-- psql -d <url> -f <path-to-file>

DROP TABLE IF EXISTS users, cookie_sessions, links CASCADE;
DROP TYPE IF EXISTS priority;

CREATE TYPE priority as ENUM ('high', 'medium', 'low');

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  email VARCHAR ( 255 ) UNIQUE NOT NULL,
  password VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE cookie_sessions (
  cookie_id serial PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE links (
  link_id serial PRIMARY KEY,
  title VARCHAR (255) NOT NULL,
  url VARCHAR (255) NOT NULL,
  description VARCHAR (255),
  priority priority NOT NULL,
  category VARCHAR (255) NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT user_id
  FOREIGN KEY (user_id)
  REFERENCES users(user_id)

 );