const { pool } = require('@lib/db');

export default async function handler(req, res) {
  const { lessonId, sectionId, userId } = req.body;

  try {
    const client = await pool.connect();
    const query = `
      INSERT INTO student_progress (lesson_id, section_id, user_id, completed)
      VALUES ($1, $2, $3, true)
      ON CONFLICT (lesson_id, section_id, user_id)
      DO UPDATE SET completed = EXCLUDED.completed;
    `;
    await client.query(query, [lessonId, sectionId, userId]);
    client.release();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
