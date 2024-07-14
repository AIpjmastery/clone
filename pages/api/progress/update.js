import { pool } from '../../../lib/db';
import jwt from 'jwt-simple';

const secret = 'your_secret_key';

export default async function handler(req, res) {
    const { lessonId, sectionId } = req.body;
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.decode(token.split(' ')[1], secret);
        const userId = decoded.id;

        const result = await pool.query(
            'INSERT INTO student_progress (lesson_id, section_id, user_id, completed, completed_at) VALUES ($1, $2, $3, $4, $5)',
            [parseInt(lessonId, 10), parseInt(sectionId, 10), parseInt(userId, 10), true, new Date()]
        );
        res.status(200).json({ message: 'Progress updated successfully' });
    } catch (error) {
        console.error('Error updating progress:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
