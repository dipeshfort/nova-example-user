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
        let result;
        try {
            result = await client.query(query);
            client.release();
        } catch(err) {
            client.release();
            throw err;
        }
        return result;
    }
}

module.exports = new Db();

