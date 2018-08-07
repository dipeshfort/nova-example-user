import React from 'react';
import { ReminderList } from './ReminderList';
import { connect } from 'react-redux';

const _Dashboard = (props) => {
    return (
        <React.Fragment>
            <ReminderList title={"Open"} reminders={props.open} />
            <ReminderList title={"Past"} reminders={props.closed} />
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    console.log("DASHBOARD", state);
    return {
        open: state.reminders.filter((reminder) => reminder.status === 'OPEN'),
        closed: state.reminders.filter((reminder) => reminder.status === 'DONE')
    }
}

export const Dashboard = connect(mapStateToProps, null)(_Dashboard);