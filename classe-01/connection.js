const { Pool } = require('pg');
const { pathToFileURL } = require('url');
const password = require('../ps');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'biblioteca',
    password: password,
    port: 5432
});

const query = (text, param) => {
    return pool.query(text, param);
}

module.exports = {
    query
}