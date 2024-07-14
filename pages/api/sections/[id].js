import { pool } from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const result = await pool.query('SELECT * FROM sections WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Section not found' });
      return;
    }

    const section = result.rows[0];
    section.paragraphs = section.content.split('\n'); // Assuming paragraphs are separated by new lines

    res.status(200).json(section);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
