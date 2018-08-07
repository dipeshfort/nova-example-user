
import { combineReducers  } from "redux";
import { v4 as uuid } from 'uuid';

export const allReducers = combineReducers({
    reminders: (state = [], action) => {

        if (action.type === 'CREATE_REMINDER') {
            const reminder = action.payload;
            reminder.id = uuid();
            reminder.status = "OPEN";
            state.push(reminder);
            return state;
        }

        return state;
    }
});

