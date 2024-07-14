const { pool } = require('@lib/db');

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const lessonResult = await pool.query('SELECT * FROM lessons WHERE id = $1', [id]);

    if (lessonResult.rows.length > 0) {
      res.status(200).json(lessonResult.rows[0]);
    } else {
      res.status(404).json({ error: 'Lesson not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
