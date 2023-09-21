import { getQueryParams } from 'redux/utils';

import { applicationApi } from '../applicationApi';
import { ILocationParams, ILocationResponse, ILocationResponseNormalized } from './types';
import { normalizeLocationsResponse } from './utils';

export const locationApi = applicationApi.injectEndpoints({
	endpoints: (builder) => ({
		getLocations: builder.query<ILocationResponseNormalized, ILocationParams>({
			query: (params) => ({
				url: '/location',
				params: getQueryParams(params),
			}),
			transformResponse: ((response: ILocationResponse) => normalizeLocationsResponse(response))
		}),
	}),
});

export const { useLazyGetLocationsQuery } = locationApi;
