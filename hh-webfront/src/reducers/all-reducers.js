
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
            case 'REMOVE_REMINDER':
                const removeId = action.payload;
                return state.filter((r) => r.id !== removeId);
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
