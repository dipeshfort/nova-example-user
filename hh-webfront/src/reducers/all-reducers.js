
import { combineReducers  } from "redux";
import {
    ReminderService
} from '../services/reminder.service';

export const allReducers = combineReducers({
    reminders: (state = [], action) => {
        switch (action.type) {
            case 'RECEIVE_REMINDERS': 
                return action.payload;
            case 'ADD_REMINDER':
                state.push(action.payload);
                return state;
            case 'UPDATE_REMINDER':
                return update(state, action.payload);
            case 'MARK_OPEN': 
                return update(state, {
                    id: action.payload,
                    status: 'OPEN'
                });
        }

        return state;
    }
});

function update(reminders, updatedReminder) {
    return reminders.map((reminder) => {
        if (reminder.id !== updatedReminder.id) {
            return reminder;
        }

        return Object.assign({}, reminder, updatedReminder);
    })
}
