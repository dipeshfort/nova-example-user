const db = require('../utils/db');
const logger = require('../utils/logger');
const {
    v4
} = require('uuid');
const crypto = require('crypto');

class UsersRepository {
    constructor(context) {
        this.context = context;
    } 
    async fetchAll() {
        const result = await this.context.query('SELECT * from users');
        logger.trace(`Returned ${result.rows.length} users.`);
        return result.rows.map((row) => {
            return this.toUser(row);
        });
    }

    async fetchOne(id) {
        const query = {
            name: 'fetch-user',
            text: 'SELECT * FROM users WHERE id = $1',
            values: [id]
        };

        const result = await this.context.query(query);
        if (!result.rows.length) {
            throw new Error('ERROR_NOT_FOUND::User not found');
        }
        return this.toUser(result.rows[0]);
    }

    async fetchByCredentials(credentials) {
        const { email, passwordPlain } = credentials;
        const query = {
            name: 'fetch-user-by-cred',
            text: 'SELECT * FROM users WHERE email = $1 AND password = $2',
            values: [email, this.encryptPassword(passwordPlain)]
        };

        const result = await this.context.query(query);
        if (!result.rows.length) {
            const error = new Error('User not found');
            error.code = "ERR_NOT_FOUND";
            throw error;
        }
        return this.toUser(result.rows[0]);
    }

    async create(userDataInput) {
        const userId = v4();
        const { firstname, lastname, email, passwordPlain, role } = userDataInput;

        const query = {
            name: 'insert-user',
            text: 'INSERT INTO users(id, firstname, lastname, email, password, role) VALUES($1, $2, $3, $4, $5, $6)',
            values: [userId, firstname, lastname, email, this.encryptPassword(passwordPlain), role]
        };
        try {
            const result = await this.context.query(query)
            if (result.rowCount !== 1) {
                throw new Error("ERROR_DB_FAIL::Unable to create resource");
            }
        } catch(error) {
            let customError;
            
            if (!error.code) {
                throw error;
            }

            switch( error.code) {
                case '23505':
                    customError = new Error('Duplicate user');
                    customError.code = 'ERR_DB_CONSTRAINT';
                    customError.details = 'Existing user email';
                    customError.original = error;
                    throw customError;
                case 'ECONNREFUSED':
                    customError = new Error('Error connecting to database');
                    customError.code = 'ERR_DB_CONNECTION';
                    customError.details = '';
                    customError.original = error;
                    throw customError;
                default: 
                    throw error;
            }
        }
        return userId;
    }

    /**
     * Delete by Id
     * @param {number} affectedRows
     */
    async delete(id) {
        const query = {
            name: 'delete-user',
            text: 'DELETE from users WHERE id = $1',
            values: [id]
        };
        const operationResult = await this.context.query(query)
        return operationResult.rowCount;
    }

    /**
     * Update reminder with new data
     * @param {number} affectedRows
     */
    async update(reminderId, data) {
        const values = [];

        const updates = Object.keys(data).map((field, idx) => {
            // Intentional extra $ near '${idx...'
            let dbField;
            switch(field) {
                case 'title': 
                    dbField = 'title';
                    break;
                case 'comments': 
                    dbField = 'comments';
                    break;
                case 'amount':
                    dbField = 'amount';
                    break;
                case 'remindDate':
                    dbField = 'remind_date';
                    break;
                case 'status': 
                    dbField = 'status';
                    break;
                default:
                    throw new Error('Invalid update field' + field);
            }
            values.push(data[field]);
            return `${dbField} = $${idx + 1}`;
        }).join(',');

        const query = {
            // Intentional extra '$' near 'id ='
            text: `UPDATE reminders SET ${updates} WHERE id = $${values.length + 1}`,
            values: [...values, reminderId]
        };
        const operationResult = await this.context.query(query)
        return operationResult.rowCount;
    }

    toUser(row) {
        return {
            id: row.id,
            firstname: row.firstname,
            lastname: row.lastname,
            email: row.email,
            role: row.role,
            created: row.created,
            updated: row.updated,
        }
    }

    encryptPassword(passwordPlain) {
        return crypto.createHmac('sha256', 'nova')
            .update(passwordPlain)
            .digest('hex');
    }
}
module.exports = new UsersRepository(db);