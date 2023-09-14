import { ICharacter } from 'types/character';
import { ICharactersResponse, ICharactersResponseNormalized } from './types';

export const normalizeCharactersResponse = (response: ICharactersResponse): ICharactersResponseNormalized => {
	return {
		...response,
		charactersIds: response.results.map((item) => item.id),
	};
};

export const normalizeMultipleCharactersReaponse = (response: ICharacter | ICharacter[]): ICharacter[] => {
	if (!Array.isArray(response)) {
		return [ response ];
	}
	return response;
};
