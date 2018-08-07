const {
    Pool
} = require('pg');
const logger = require('./logger');

class Db {
    constructor() {
        logger.trace("Init connection pool");
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: false
        });
    }

    async query(query) {
        const client = await this.pool.connect()
        return await client.query(query);
    }
}

module.exports = new Db();

