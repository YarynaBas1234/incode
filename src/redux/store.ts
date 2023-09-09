import { configureStore} from '@reduxjs/toolkit';
import { charactersApi } from './services/characters/charactersApi';
import { rtkQueryErrorLogger } from './services/rtkQueryErrorLogger';

export const store = configureStore({
	reducer: {
		[charactersApi.reducerPath]: charactersApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
            .concat(charactersApi.middleware)
            .concat(rtkQueryErrorLogger),
});
