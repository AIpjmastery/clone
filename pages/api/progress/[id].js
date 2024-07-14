import { pool } from '../../../lib/db';

export default async function handler(req, res) {
    const { id } = req.query;

    try {
        const result = await pool.query('SELECT * FROM student_progress WHERE section_id = $1', [id]);

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Progress not found' });
            return;
        }

        const progress = result.rows[0];
        progress.percentage = calculateProgress(progress);

        res.status(200).json(progress);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

function calculateProgress(progress) {
    const totalParagraphs = 5; 
    const completedParagraphs = progress.completed_paragraphs; 
    return (completedParagraphs / totalParagraphs) * 100;
}
