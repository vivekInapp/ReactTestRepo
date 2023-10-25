import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from '../shared/users/userSlice'
import storage from 'redux-persist/es/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import appServiceReducer from '../shared/appServices/appServiceSlice';

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    users: userReducer,
    appService: appServiceReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store)