import React, { Component } from 'react';
import { ReminderList } from './ReminderList';
import { connect } from 'react-redux';
import { DashboardTime } from './DashboardTime';

// Styles
import './Dashboard.css';

class _Dashboard extends Component {

    render() {
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
                            <ReminderList className="list-opened" title={"Open"} onSelect={this.props.markClosed} reminders={this.props.open} />
                        </div>
                        <div className="col-sm-12 col-md-6 col-xl-5">
                            <ReminderList className="list-closed" title={"Paid"} onSelect={this.props.markOpen} reminders={this.props.closed} />
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        open: state.reminders.filter((reminder) => reminder.status === 'OPEN'),
        closed: state.reminders.filter((reminder) => reminder.status === 'CLOSED')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        markClosed: (reminderId) => {
            dispatch({
                type: 'MARK_CLOSED',
                payload: reminderId
            });
        },
        markOpen: (reminderId) => {
            dispatch({
                type: 'MARK_OPEN',
                payload: reminderId
            });
        }
    }
}

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(_Dashboard);