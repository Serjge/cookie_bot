import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const {
  DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER,
} = process.env;

export const pool = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_DATABASE,
});
