import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { majorLablApi } from './api_service/majorLabl_api';
import { audioReducer } from './audio';
import { authSlice } from './auth/auth.slice';
import { bapsReducer } from './bap';
import { currentReducer } from './current';
import { downloadsReducer } from './downloads';
import { errorsReducer } from './errors';
import { filtersReducer } from './filters';
import { releasesReducer } from './releases';
import { transactionsReducer } from './transactions';
import { usersReducer } from './users';
import { WithdrawalsReducer } from './withdrawals';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'isLoggedIn'],
};

const audioPersistConfig = {
  key: 'audio',
  storage,
};

const currentPersistConfig = {
  key: 'current',
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice.reducer),
  audio: persistReducer(audioPersistConfig, audioReducer),
  current: persistReducer(currentPersistConfig, currentReducer),
  downloads: downloadsReducer,
  baps: bapsReducer,
  transactions: transactionsReducer,
  withdrawals: WithdrawalsReducer,
  filters: filtersReducer,
  releases: releasesReducer,
  users: usersReducer,
  error: errorsReducer,
  [majorLablApi.reducerPath]: majorLablApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(majorLablApi.middleware),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);

export default store;
