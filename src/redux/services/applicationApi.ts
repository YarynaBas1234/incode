import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'consts';

export const applicationApi = createApi({
	reducerPath: 'applicationApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
	}),
	keepUnusedDataFor: 0,
	endpoints: () => ({}),
});
