import { applicationApi } from '../applicationApi';
import { CharactersParams, ICharactersResponse } from './types';

export const charactersApi = applicationApi.injectEndpoints({
	endpoints: (builder) => ({
		getCharacters: builder.query<ICharactersResponse, CharactersParams>({
			query: ({page}) => ({
				url: '/character',
				params: {
					page,
				},
			}),
		}),
	}),
});

export const { useGetCharactersQuery } = charactersApi;
