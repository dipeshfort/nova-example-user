import React from 'react';
import {
    Route, Switch
} from 'react-router-dom';

import { MainNav } from './components/MainNav';

// Components
import { ReminderList } from './components/ReminderList';
import { ReminderDetails } from './components/ReminderDetails';
import { ReminderCreate } from './components/ReminderCreate';

import { ReminderService } from './services/reminder.service';

const reminderService = new ReminderService();

export const App = () => {
    return (
        <React.Fragment>
        <main>
            <MainNav />
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