const db = require('../utils/db');
const logger = require('../utils/logger');
const {
    v4
} = require('uuid');

class RemindersRepository {

    constructor(context) {
        this.context = context;
    } 
    async fetchAll() {
        const result = await this.context.query('SELECT * from reminders');
        logger.trace(`Returned ${result.rows.length} reminders.`);
        return result.rows.map((rowItem) => {
            return {
                id: rowItem.id,
                title: rowItem.title,
                comments: rowItem.comments,
                amount: rowItem.amount,
                remindDate: rowItem.remind_date,
                created: rowItem.created,
                status: rowItem.status
            };
        });
    }

    async fetchOne(reminderId) {
        const query = {
            name: 'fetch-reminder',
            text: 'SELECT * FROM reminders WHERE id = $1',
            values: [reminderId]
        };

        const result = await this.context.query(query);
        if (!result.rows.length) {
            return null;
        }
        const rowItem = result.rows[0];

        return {
            id: rowItem.id,
            title: rowItem.title,
            comments: rowItem.comments,
            amount: rowItem.amount,
            remindDate: rowItem.remind_date,
            created: rowItem.created,
            status: rowItem.status
        }
    }

    async create(reminderData) {
        const reminderId = v4();
        const query = {
            name: 'insert-reminder',
            text: 'INSERT INTO reminders(id, title, comments, amount, remind_date, status) VALUES($1, $2, $3, $4, $5, $6)',
            values: [reminderId, ...reminderData]
        };
        const result = await this.context.query(query)
        if (result.rowCount !== 1) {
            logger.fatal("Unable to create resource", result);
            throw new Error("Unable to create resource");
        }
        return reminderId;
    }

    /**
     * Delete reminder by Id
     * @param {number} affectedRows
     */
    async delete(reminderId) {
        const query = {
            name: 'delete-reminder',
            text: 'DELETE from reminders WHERE id = $1',
            values: [reminderId]
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
}
module.exports = new RemindersRepository(db);