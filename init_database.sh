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

CREATE TABLE fiffift.expense(
    id serial primary key,
    description varchar(120) not null,
    type varchar(30) not null,
    recurrent boolean default false,
    constraint expense_uq1 unique (description, type)
);

CREATE TABLE fiffift.expense_record(
    id serial primary key,
    expense_id integer not null,
    year smallint not null,
    month smallint not null,
    amount integer not null,
    constraint expense_record_fk1 foreign key (expense_id) references expense(id),
    constraint expense_record_uq1 unique (expense_id, year, month)
);

EOSQL