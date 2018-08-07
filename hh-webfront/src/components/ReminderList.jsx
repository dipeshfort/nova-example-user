import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class ReminderList extends Component {
    render() {
        return (
            <section className="container">
                <h1>Reminders</h1>
                <Link className="btn btn-primary btn-sm" to={"/reminders/create"}>Add</Link>
                <div>
                { this.props.reminders.map((reminder) => {
                    return (
                        <div className="row" key={reminder.id}>
                            <div className="col-2"> {reminder.remindDate } </div>
                            <div className="col-6"> 
                                <p><strong>{ reminder.title }</strong></p> 
                                <p> {reminder.comments } </p>
                            </div>
                            <div className="col-2"> { reminder.amount } €</div>
                            <div className="col-2"> 
                                <Link to={`/reminders/${reminder.id}`} className="btn btn-secondary btn-sm">Edit</Link>
                            </div>
                        </div>
                    )
                })}
                </div>
            </section>
        );
    }
}