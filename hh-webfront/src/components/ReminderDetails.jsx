import React, { Component } from 'react';

export class ReminderDetails extends Component {
    render() {
        return (
            <section className="container">
                <h1>Reminder Details</h1>
                <div>
                    { this.props.reminder.title }
                </div>
            </section>
        );
    }
}