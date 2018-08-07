import React from 'react';
import { ReminderList } from './ReminderList';
import { connect } from 'react-redux';
import { DashboardTime } from './DashboardTime';

const _Dashboard = (props) => {
    return (
        <React.Fragment>
            <section className="container-fluid">
                <div className="row">
                    <div className="col">
                        <DashboardTime />
                    </div>
                </div>
            </section>
            <section className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-xl-5">
                        <ReminderList title={"Open"} reminders={props.open} />
                    </div>
                    <div className="col-sm-12 col-md-6 col-xl-5">
                        <ReminderList title={"Past"} reminders={props.closed} />
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        open: state.reminders.filter((reminder) => reminder.status === 'OPEN'),
        closed: state.reminders.filter((reminder) => reminder.status === 'DONE')
    }
}

export const Dashboard = connect(mapStateToProps, null)(_Dashboard);