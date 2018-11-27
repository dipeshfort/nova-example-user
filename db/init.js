#!/usr/bin/env node
require('dotenv').config();
const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
const query = client.query(`
    DROP TABLE users;
    CREATE TABLE users(
        id UUID NOT NULL PRIMARY KEY,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        email VARCHAR(64) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL,
        created TIMESTAMP DEFAULT current_timestamp,
        updated TIMESTAMP DEFAULT current_timestamp
    );
`).then((operationResult) => {
    console.log("DB Init", JSON.stringify(operationResult));
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