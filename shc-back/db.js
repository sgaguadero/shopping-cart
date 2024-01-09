const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123456',
    database: 'postgres'
});

function query(sql, params) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, result, fields) => {
            if (err) {
                reject(err);
                return;
            }
            return resolve([result, fields]);
        })
    })
};

module.exports = {
    query
}
