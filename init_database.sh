#!/bin/bash

set -e
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
-- revoke privileges on public, but keep it to install extensions

REVOKE CREATE ON SCHEMA public FROM PUBLIC;

-- create users

CREATE USER $FIFFIFT_USER WITH ENCRYPTED PASSWORD '$FIFFIFT_PASSWORD';

-- create all schemas

CREATE SCHEMA $FIFFIFT_SCHEMA AUTHORIZATION $FIFFIFT_USER;

GRANT $FIFFIFT_USER TO $POSTGRES_USER;

-- create extensions

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA $FIFFIFT_SCHEMA; -- provides cryptographic functions for PostgresSQL
CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA $FIFFIFT_SCHEMA; -- provides GIN index operator, used for improving similarity searches using LIKE

-- configure $FIFFIFT_USER

GRANT ALL PRIVILEGES ON SCHEMA $FIFFIFT_SCHEMA TO $FIFFIFT_USER;
GRANT CONNECT ON DATABASE $POSTGRES_DB TO $FIFFIFT_USER;
EOSQL

# create tables
psql -v ON_ERROR_STOP=1 --username "$FIFFIFT_USER" --dbname "$POSTGRES_DB" <<-EOSQL
CREATE TABLE fiffift.income (
    id SERIAL PRIMARY KEY,
    salary integer not null,
    meal_ticket integer,
    extras integer
);
EOSQL