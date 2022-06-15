// import { createStore } from 'redux';
// import rootReducer from './rootReducer';
// import thunk from 'redux-thunk';
// import { applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import persistedReducer from './rootReducer';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// const middleWare = [thunk];

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWare))); // store 생성

// export default store;

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export default store;
