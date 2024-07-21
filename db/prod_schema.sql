DROP DATABASE IF EXISTS colors_prod_epgi;
CREATE DATABASE colors_prod_epgi;

\c colors_prod_epgi;

CREATE TABLE colors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    is_favorite BOOLEAN
);