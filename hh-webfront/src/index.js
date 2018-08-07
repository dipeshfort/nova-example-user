import React from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter, Route, Switch, Link
} from 'react-router-dom'

import './styles.css';

// Components
import { ReminderList } from './components/ReminderList';
import { ReminderDetails } from './components/ReminderDetails';
import { ReminderCreate } from './components/ReminderCreate';

import { ReminderService } from './services/reminder.service';

const reminderService = new ReminderService();

const App = () => {
    return (
        <React.Fragment>
        <nav>
            <Link to="/">Home</Link>
        </nav>
        <main>
            <Switch>
                <Route 
                    exact
                    path='/' 
                    render={
                        () => <ReminderList reminders={ reminderService.getReminders() } />
                    }
                />
                <Route 
                    exact
                    path='/reminders/create' 
                    component = { ReminderCreate }
                />
                <Route 
                    path='/reminders/:id'
                    render = { (props) => {
                        return <ReminderDetails reminder={ reminderService.findOne(+props.match.params.id) } />
                    }}
                />
            </Switch>
        </main>
        </React.Fragment>
    );
};

render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.querySelector('#root'));
