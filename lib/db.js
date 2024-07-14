import { Pool } from 'pg';

console.log("db.js is being imported");

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'AIQUIZDB',
    password: '    ',
    port: 5432,
});

module.exports = { pool };
