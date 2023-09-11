import { applicationApi } from '../applicationApi';
import { IEpisodesResponse, IEpisodeResponseNormalized, IEpisodesParams } from './types';
import { normalizeEpisodesResponse } from './utils';

export const episodeApi = applicationApi.injectEndpoints({
	endpoints: (builder) => ({
		getEpisodes: builder.query<IEpisodeResponseNormalized, IEpisodesParams>({
			query: ({ page }) => ({
				url: '/episode',
				params: {
					page,
				},
			}),
			transformResponse: ((response: IEpisodesResponse) => normalizeEpisodesResponse(response)),
		}),
	}),
});

export const { useGetEpisodesQuery } = episodeApi;
