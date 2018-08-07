import React from 'react';
import { Link } from 'react-router-dom';

export const ReminderList = (props) => {
    const reminders = props.reminders.sort((a, b) => {
        if (a.remindDate === b.remindDate) {
            return 0;
        }

        return (a.remindDate > b.remindDate)? 1: -1;
    });
    
    const containerHeight = 41 + (reminders.length * 40);

    return (
        <React.Fragment>
        <section style={{
                height: `${containerHeight}px`,
                overflow: 'hidden',
                marginBottom: '15px'
            }}
            className={props.className}
        >
            <h3 style={{position: "relative"}}>
                { props.title }&nbsp;
                <span style={{fontSize: "0.5em", position: "absolute", top: "0px"}} className="badge badge-info">
                    {reminders.length}
                </span>
            </h3>
            <svg version="1.1"
                width="100%"
                height="100%"
                fill="purple"
                xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(0, 5)">
                {reminders.map((reminder, index) => {
                    const posX = 2;
                    const posY = index * 40;
                    const prevPosY = ((index - 1) * 40) + 21;

                    return (
                        <g key={reminder.id}>
                            {
                                (index > 0) &&
                                <path d={`M${12} ${prevPosY} V ${posY} Z`} fill="transparent" stroke="#89C5E3" strokeWidth="4" />
                            }
                            <g 
                                onClick={(_) => { props.onSelect(reminder.id); } }
                                style={{ cursor: "pointer" }}
                                transform={`translate(${posX}, ${posY})`}
                            >
                                <circle cx="10" cy="10" r="10" strokeWidth="2" stroke="#002B7F" fill="transparent" />
                                <text x="25" y="15" >
                                    <tspan fill="purple" className="text-date">{ reminder.remindDate }</tspan>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Link style={{textDecoration: "none"}} 
                                        to={`/reminders/${reminder.id}`}>
                                        <tspan fontSize="20" fill="black" >
                                            <tspan>{reminder.title}</tspan>
                                            &nbsp;&nbsp;
                                            <tspan fontWeight="200" fill="black">{reminder.amount} €</tspan>
                                        </tspan>
                                    </Link>
                                </text>
                            </g>
                        </g>
                    )
                })}
                </g>
            </svg>
        </section>
        </React.Fragment>
    );
};