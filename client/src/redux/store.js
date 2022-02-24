import { createStore } from 'redux';
import rootReducer from './rootReducer';

const store = createStore(rootReducer); // store 생성

export default store;
