import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { charactersApi } from './services/characters/charactersApi';
import { rtkQueryErrorLogger } from './services/rtkQueryErrorLogger';
import { locationApi } from './services/location/locationApi';
import { applicationApi } from './services/applicationApi';
import { episodeApi } from './services/episode/episodeApi';
import charactersFilterSlice from './slices/charactersFilterSlice';

const rootReducer = combineReducers({
	[applicationApi.reducerPath]: applicationApi.reducer,
	[charactersApi.reducerPath]: charactersApi.reducer,
	[locationApi.reducerPath]: locationApi.reducer,
	[episodeApi.reducerPath]: episodeApi.reducer,
	charactersFilterSlice: charactersFilterSlice.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			rtkQueryErrorLogger,
			applicationApi.middleware,
		)
});
