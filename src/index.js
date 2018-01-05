import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './extras/store';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import "materialize-css/dist/css/materialize.min.css";
import "jquery";
import "materialize-css/dist/js/materialize.min";


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('shopping-list-app'));
registerServiceWorker();
