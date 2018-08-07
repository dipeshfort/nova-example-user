import React from 'react';
import { render } from 'react-dom';
import './styles.css';

const App = () => {
    return (<h1> Hello react!</h1>);
};

render(<App />, document.querySelector('#root'));