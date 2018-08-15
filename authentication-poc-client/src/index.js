import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/bootstrap.css';
import './assets/css/w3.css';
import './assets/css/material-icons.css';
import 'noty/lib/noty.css'
import './assets/css/noty.css'

import App from './app/App';

ReactDOM.render(
    <Router>
        <App/>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
