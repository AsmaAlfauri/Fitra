const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DBURI,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
