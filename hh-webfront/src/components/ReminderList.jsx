import React from 'react';
import { Link } from 'react-router-dom';

export const ReminderList = (props) => {
    const reminders = props.reminders.sort((a, b) => {
        if (a.remindDate === b.remindDate) {
            return 0;
        }

        return (a.remindDate > b.remindDate)? 1: -1;
    });
    return (
        <section className="container">
            <h3>{props.title}</h3>
            <div>
            { reminders.map((reminder) => {
                return (
                    <div className="row" key={reminder.id}>
                        <div className="col-md-3"> {reminder.remindDate } </div>
                        <div className="col-md-7"> 
                            <p>
                                <Link to={`/reminders/${reminder.id}`}>
                                    <strong>{ reminder.title }</strong>
                                </Link>
                                {reminder.comments}
                            </p>
                        </div>
                        <div className="col-2"> { reminder.amount } €</div>
                    </div>
                )
            })}
            </div>
        </section>
    );
}
