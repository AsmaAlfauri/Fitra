import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import signupReducer from "./slices/signupSlice";
import campaignReducer from "./slices/campaignSlice";
import donationReducer from './slices/donationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signupReducer,
    campaigns: campaignReducer, 
    donations: donationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
