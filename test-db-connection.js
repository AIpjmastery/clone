const { pool } = require('./lib/db');

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connection successful:', res.rows);
  } catch (error) {
    console.error('Error connecting to the database:', error.message, error.stack);
  } finally {
    pool.end();
  }
})();
