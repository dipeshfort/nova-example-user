import React from 'react';
import { Link } from 'react-router-dom';

export const ReminderList = (props) => {
    return (
        <section className="container">
            <h3>{props.title}</h3>
            <div>
            { props.reminders.map((reminder) => {
                return (
                    <div className="row" key={reminder.id}>
                        <div className="col-2"> {reminder.remindDate } </div>
                        <div className="col-8"> 
                            <p>
                                <Link to={`/reminders/${reminder.id}`}>
                                    <strong>{ reminder.title }</strong>
                                </Link>
                            </p> 
                            <p> {reminder.comments } </p>
                        </div>
                        <div className="col-2"> { reminder.amount } €</div>
                    </div>
                )
            })}
            </div>
        </section>
    );
}