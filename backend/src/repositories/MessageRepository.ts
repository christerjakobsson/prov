import { Pool } from 'pg';
import Message from '../typings/message';

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'messages',
  password: 'password',
  port: 5432,
});

const getMessages = (): Message[] => pool.query('SELECT * FROM messages ORDER BY id ASC', (error, results) => {
  if (error) {
    throw error;
  }
  return results.rows as Message[];
});

const getMessageById = (id: number) => {
  pool.query('SELECT * FROM messages WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    return results.rows as Message;
  });
};

export { getMessages, getMessageById };
