
import React from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter
} from 'react-router-dom';

// ==========================
// ======== REDUX ===========
// ==========================
import {
    Provider
} from 'react-redux';
import {
    createStore,
    applyMiddleware
} from 'redux';

import {
    allReducers
} from './reducers/all-reducers';
import thunkMiddleware from 'redux-thunk';

const store = createStore(allReducers, applyMiddleware(
    thunkMiddleware
));

ReminderService.fetchAll().then((reminders) => {
    store.dispatch({
        type: 'RECEIVE_REMINDERS',
        payload: reminders
    })
});

// ======== /REDUX ===========

import './styles.css';
import {
    App
} from './App';
import { ReminderService } from './services/reminder.service';

render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.querySelector('#root'));
