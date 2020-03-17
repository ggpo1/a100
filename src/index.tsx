import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './A100/App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Emit from "./MapCore/Data/Emit";

Emit.Emitter.setMaxListeners(999999);

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
