import pg from "pg";
const { Pool } = pg;

/*TODO use environment variables */

const pool = new Pool({
  user: "fiffift",
  host: "localhost",
  database: "postgres",
  password: "fiffift",
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const query = async (text, params) => pool.query(text, params);

export const getClient = async () => {
  return pool.connect();
};
