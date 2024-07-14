import { pool } from '../../../lib/db';

export default async function handler(req, res) {
  try {
    const result = await pool.query('SELECT * FROM student_progress');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching student progress:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
