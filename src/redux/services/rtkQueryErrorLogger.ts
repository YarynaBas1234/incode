import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';

import { notify } from 'helpers';

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
	if (isRejectedWithValue(action)) {
		notify({ message: action.payload.data.error, position: 'top-right', type: 'error' });
	}
	return next(action);
};
