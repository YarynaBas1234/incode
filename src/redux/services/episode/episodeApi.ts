import { getQueryParams } from 'redux/utils';

import { applicationApi } from '../applicationApi';
import { IEpisodesResponse, IEpisodeResponseNormalized, IEpisodesParams } from './types';
import { normalizeEpisodesResponse } from './utils';

export const episodeApi = applicationApi.injectEndpoints({
	endpoints: (builder) => ({
		getEpisodes: builder.query<IEpisodeResponseNormalized, IEpisodesParams>({
			query: (params) => ({
				url: '/episode',
				params: getQueryParams(params),
			}),
			transformResponse: ((response: IEpisodesResponse) => normalizeEpisodesResponse(response)),
		}),
	}),
});

export const { useLazyGetEpisodesQuery } = episodeApi;
