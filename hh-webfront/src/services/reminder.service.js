
import { dateFormat } from '../utils';
const REMINDERS_API = 'http://localhost:5000/reminders';

export class ReminderService {
    static async fetchAll() {
        const reminders = await fetch(REMINDERS_API).then((resp) => {
            return resp.json()
        });

        this.reminders = reminders.map((reminder) => {
            reminder.remindDate = dateFormat(new Date(reminder.remindDate));
            return reminder;
        });
        return Promise.resolve(this.reminders);
    }

    static async create(reminderData) {
        const data = {
            ...reminderData,
            status: "OPEN"
        };
        const api = REMINDERS_API;
        console.info(`Creating reminder ${api}`);
        return await fetch(api, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json());
    }

    static async update(reminderId, reminderData) {
        const data = {
            ...reminderData,
        };
        const api = `${REMINDERS_API}/${reminderId}`;
        console.info(`Updating ${api}`, reminderData);
        return await fetch(api, {
            method: 'PATCH',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json());
    }
    static async delete(reminderId) {
        const api = `${REMINDERS_API}/${reminderId}`;
        console.info(`Deleting ${api}`);
        return await fetch(api, {
            method: 'DELETE',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        }).then(resp => resp.json());
    }
}
