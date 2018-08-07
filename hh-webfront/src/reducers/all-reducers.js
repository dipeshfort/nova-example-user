
import { combineReducers  } from "redux";
import { v4 as uuid } from 'uuid';

export const allReducers = combineReducers({
    reminders: (state = [], action) => {

        switch (action.type) {
            case 'CREATE_REMINDER':
                const reminder = action.payload;
                reminder.id = uuid();
                reminder.status = "OPEN";
                state.push(reminder);
                return state;
            case 'MARK_CLOSED':
                return update(state, action.payload, {
                    status: 'CLOSED'
                });
            case 'MARK_OPEN': 
                return update(state, action.payload, {
                    status: 'OPEN'
                });
        }

        return state;
    }
});

function update(reminders, reminderId, updatePart) {
    return reminders.map((reminder) => {
        if (reminder.id !== reminderId) {
            return reminder;
        }

        return Object.assign({}, reminder, updatePart);
    })
}
