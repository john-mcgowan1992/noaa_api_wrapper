import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './containers/store'
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/App/App';
import './styles/main.scss';

injectTapEventPlugin();

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));