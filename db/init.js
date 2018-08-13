#!/usr/bin/env node
require('dotenv').config();
const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
const query = client.query(`
    CREATE TABLE IF NOT EXISTS reminders(
        id UUID NOT NULL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        comments TEXT,
        amount float8 NOT NULL,
        remind_date TIMESTAMP NOT NULL,
        created TIMESTAMP DEFAULT current_timestamp,
        status VARCHAR(10)
    );
`).then((_) => {
    console.log("DB Init");
    closeConnection();
}).catch((err) => {
    console.log("ERROR", err);
    closeConnection();
});

function closeConnection() {
    if (client) {
        client.end();
    }
}