import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/user';

export default configureStore({
    reducer: {
        user: userSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
            serializableCheck: false,
            immutableCheck: false,
        }),
})