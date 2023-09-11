import { applicationApi } from '../applicationApi';
import { CharactersParams, ICharactersResponse, CharacterIDParams, ICharacter } from './types';

export const charactersApi = applicationApi.injectEndpoints({
	endpoints: (builder) => ({
		getCharacters: builder.query<ICharactersResponse, CharactersParams>({
			query: ({ page }) => ({
				url: '/character',
				params: {
					page,
				},
			}),
		}),
		getCharacter: builder.query<ICharacter, CharacterIDParams>({
			query: ({ id }) => ({
				url: `/character/${id}`,
				params: {
					id,
				},
			}),
		}),
	}),
});

export const { useGetCharactersQuery, useGetCharacterQuery } = charactersApi;
