import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducers from './reducers/index'
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

let store = createStore(reducers)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
//registerServiceWorker();
