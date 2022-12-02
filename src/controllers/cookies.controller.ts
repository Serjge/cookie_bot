import { pool } from '../db';

export const cookieController = {
  async addCookie(cookie:string) {
    return pool.query('INSERT INTO cookies (cookie) values ($1) RETURNING *', [cookie]);
  },
  async getCookie() {
    return pool.query('SELECT cookie FROM cookies');
  },
};
