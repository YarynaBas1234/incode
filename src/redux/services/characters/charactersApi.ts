import { ICharacter } from 'types/character';
import { applicationApi } from '../applicationApi';
import { ICharactersParams, ICharactersResponse, ICharactersResponseNormalized } from './types';
import { normalizeCharactersResponse } from './utils';

export const charactersApi = applicationApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllCharacters: builder.query<ICharactersResponseNormalized, ICharactersParams>({
			query: ({ page }) => ({
				url: '/character',
				params: {
					page,
				},
			}),
			transformResponse: (response: ICharactersResponse) => normalizeCharactersResponse(response),
		}),
		getCharacter: builder.query<ICharacter, { id: number }>({
			query: ({ id }) => ({
				url: `/character/${id}`,
			}),
		}),
		getMultipleCharacters: builder.query<ICharacter[], { ids: number[] }>({
			query: ({ ids }) => ({
				url: `/character/${ids}`,
			}),
		}),
	}),
});

export const { useGetAllCharactersQuery, useGetCharacterQuery, useGetMultipleCharactersQuery } = charactersApi;
