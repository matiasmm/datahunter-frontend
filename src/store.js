import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rlogger from 'redux-logger';
import rootReducer from './modules/index';


export default createStore(rootReducer, applyMiddleware(rlogger, thunk));
