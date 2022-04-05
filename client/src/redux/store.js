import { createStore } from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleWare = [thunk];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWare))); // store 생성

export default store;
