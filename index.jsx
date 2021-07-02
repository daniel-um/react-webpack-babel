import * as React from 'react';
import ReactDom from 'react-dom';

const reactDomContainer = document.getElementById('react-dom-container');
const App = () => { return <h1>Good to go</h1> }
const rootComponent = App();
ReactDom.render(rootComponent, reactDomContainer);