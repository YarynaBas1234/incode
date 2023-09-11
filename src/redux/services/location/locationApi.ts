import { applicationApi } from '../applicationApi';
import { ILocationParams, ILocationResponse, ILocationResponseNormalized } from './types';
import { normalizeLocationsResponse } from './utils';

export const locationApi = applicationApi.injectEndpoints({
	endpoints: (builder) => ({
		getLocations: builder.query<ILocationResponseNormalized, ILocationParams>({
			query: ({ page }) => ({
				url: '/location',
				params: {
					page,
				},
			}),
			transformResponse: ((response: ILocationResponse) => normalizeLocationsResponse(response))
		}),
	}),
});

export const { useGetLocationsQuery } = locationApi;
