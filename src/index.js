import React from 'react';
import {render} from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter } from 'react-router-dom'
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, 
    document.getElementById('root')
);

registerServiceWorker();


