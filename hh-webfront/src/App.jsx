import React from 'react';
import {
    Route, Switch
} from 'react-router-dom';

import { MainNav } from './components/MainNav';

// Components
import { ReminderDetails } from './components/ReminderDetails';
import { ReminderCreate } from './components/ReminderCreate';

import { Dashboard } from './components/Dashboard';

export const App = () => {
    return (
        <React.Fragment>
        <main>
            <MainNav />
            <Switch>
                <Route 
                    exact
                    path='/' 
                    render={() => <Dashboard />}
                />
                <Route 
                    exact
                    path='/reminders/create' 
                    component = { ReminderCreate }
                />
                <Route 
                    path='/reminders/:id'
                    component = { ReminderDetails }
                />
            </Switch>
        </main>
        </React.Fragment>
    );
};