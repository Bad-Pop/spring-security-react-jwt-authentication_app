import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'


import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/bootstrap-lux.css';
import './assets/css/custom.css';
import './assets/css/w3.css';
import './assets/css/material-icons.css';
import 'noty/lib/noty.css'
import './assets/css/noty.css'

import App from './App';

library.add(fab);

ReactDOM.render(
    <Router>
        <App/>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
