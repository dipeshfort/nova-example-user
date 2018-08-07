import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class ReminderList extends Component {
    handleClick(event) {
        console.log(event);
    }

    render() {
        const reminders = this.props.reminders.sort((a, b) => {
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
            }}>
                <h3 style={{position: "relative"}}>
                    {this.props.title}&nbsp;
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
                                    onClick={this.handleClick}
                                    style={{ cursor: "pointer" }}
                                    transform={`translate(${posX}, ${posY})`}
                                >
                                    <circle cx="10" cy="10" r="10" strokeWidth="2" stroke="#002B7F" fill="transparent" />
                                    <text x="25" y="15" fill="purple" >
                                        { reminder.remindDate }
                                    </text>
                                    <Link style={{textDecoration: "none"}} 
                                        to={`/reminders/${reminder.id}`}>
                                        <text fontSize="20" x="125" y="15" fill="black" >
                                            <tspan>{reminder.title}</tspan>
                                            &nbsp;&nbsp;
                                            <tspan fontWeight="200" fill="black">{reminder.amount} €</tspan>
                                        </text>
                                    </Link>
                                </g>
                            </g>
                        )
                    })}
                    </g>
                </svg>
            </section>
            </React.Fragment>
        );
    }
}
