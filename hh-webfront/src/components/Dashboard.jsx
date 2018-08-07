import React from 'react';
import { ReminderList } from './ReminderList';

export const Dashboard = (props) => {
    return (
        <React.Fragment>
            <ReminderList title={"Open"} reminders={props.reminderService.getOpen()} />
            <ReminderList title={"History"} reminders={props.reminderService.getClosed()} />
        </React.Fragment>
    );
};