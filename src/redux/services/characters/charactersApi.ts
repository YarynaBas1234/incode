import { ICharacter } from 'types/character';
import { getQueryParams } from 'redux/utils';

import { applicationApi } from '../applicationApi';
import { ICharactersParams, ICharactersResponse, ICharactersResponseNormalized } from './types';
import { normalizeCharactersResponse, normalizeMultipleCharactersReaponse } from './utils';

export const charactersApi = applicationApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllCharacters: builder.query<ICharactersResponseNormalized, ICharactersParams>({
			query: (params) => ({
				url: '/character',
				params: getQueryParams(params),
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
			transformResponse: (response: ICharacter | ICharacter[]) => normalizeMultipleCharactersReaponse(response),
		}),
	}),
});

export const {
	useGetAllCharactersQuery,
	useLazyGetAllCharactersQuery,
	useGetCharacterQuery,
	useGetMultipleCharactersQuery,
} = charactersApi;
