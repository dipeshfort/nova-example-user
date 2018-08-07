import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const navStyle = {
    marginBottom: "15px"
};
export const MainNav = () => {
    return (
        <nav style={navStyle} className="navbar navbar-expand-sm navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Reminder</Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" ></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" exact to={"/"}>Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" to={"/reminders/create"}>Add</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};