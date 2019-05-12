const { Client } = require('pg');

//DB connection
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

module.exports = client;