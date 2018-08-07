
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
            case 'UPDATE_REMINDER':
                return update(state, action.payload);
            case 'MARK_CLOSED':
                return update(state, {
                    id: action.payload,
                    status: 'CLOSED'
                });
            case 'MARK_OPEN': 
                return update(state, {
                    id: action.payload,
                    status: 'OPEN'
                });
        }

        return state;
    }
});

function update(reminders, updatePart) {
    return reminders.map((reminder) => {
        if (reminder.id !== updatePart.id) {
            return reminder;
        }

        return Object.assign({}, reminder, updatePart);
    })
}
