import React from 'react';
import { render } from 'react-dom';
import './styles.css';
import { ReminderList } from "./components/ReminderList";

const App = () => {
    return (
        <section>
            <h1> Hello react!</h1>
            <ReminderList />
        </section>
    );
};

render(<App />, document.querySelector('#root'));