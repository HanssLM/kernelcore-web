import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Pool de connexions optimitzat
export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'kernelcore_db',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Comprovació de connectivitat a la BBDD
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('[DB] Connectat amb èxit a la base de dades MariaDB/MySQL (kernelcore_db)');
    connection.release();
    return true;
  } catch {
    console.warn('[DB] Nota: El servidor MariaDB/MySQL local no està actiu o les credencials són incorrectes. El servidor funcionarà en mode Fallback/Mock.');
    return false;
  }
}
