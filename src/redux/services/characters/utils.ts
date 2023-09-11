import { ICharactersResponse, ICharactersResponseNormalized } from './types';

export const normalizeCharactersResponse = (response: ICharactersResponse): ICharactersResponseNormalized => {
	return {
		...response,
		charactersIds: response.results.map((item) => item.id),
	};
};
