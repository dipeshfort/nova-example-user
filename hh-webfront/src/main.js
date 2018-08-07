
import React from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter
} from 'react-router-dom';
import {
    Provider
} from 'react-redux';
import {
    createStore
} from 'redux';
import './styles.css';
import { App } from './App';
import { reminders } from "./mocks/reminders";

import {
    allReducers
} from './reducers/all-reducers';

const store = createStore(allReducers, {
    reminders
});

render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.querySelector('#root'));
