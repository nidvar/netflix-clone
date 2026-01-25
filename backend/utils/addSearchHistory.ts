import pool from '../db.js';

export const addSearchHistory = async function(userId: string, query: string) {
    const result = await pool.query(
        'SELECT user_id, title FROM history WHERE user_id = $1 AND title = $2',
        [userId, query]
    );
    const existingUser = result.rows[0];
    if(!existingUser) {
        await pool.query(
            `INSERT INTO history (user_id, title) VALUES ($1, $2)
            ON CONFLICT (user_id, title) DO NOTHING`,
            [userId, query]
        );
    }
}