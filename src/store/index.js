import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

import theme from './theme.js';
import core from './core.js';

const reducer = combineReducers({
  core,
  theme,
});

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, reducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }),
// });

const store = configureStore({
  reducer,
});

export default store;
