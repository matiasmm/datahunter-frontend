import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/app.js';
import rlogger from 'redux-logger';

export default createStore(reducer, applyMiddleware(rlogger));