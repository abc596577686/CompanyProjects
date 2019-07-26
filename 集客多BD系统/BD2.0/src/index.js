import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Router from './router/index';
import { Provider } from 'react-redux'
import configureStore from './redux/store/configureStore';
import * as serviceWorker from './serviceWorker';
// Redux Store对象，管理所有的Redux状态
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router/>
    </Provider>, document.getElementById('root'));
serviceWorker.unregister();
