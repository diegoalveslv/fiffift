import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: "localhost",
  database: "postgres",
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const query = async (text, params) => pool.query(text, params);

export const getClient = async () => {
  return pool.connect();
};
