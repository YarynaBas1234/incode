import { ResponsePageInfo } from 'redux/types';
import { CharacterStatus } from 'types/character';

export interface ICharactersResponse {
	info: ResponsePageInfo;
	results: {
		id: number;
		name: string;
		status: CharacterStatus;
		species: string;
		type: string;
		gender: string;
		origin: {
			name: string;
			url: string;
		};
		location: {
			name: string;
			url: string;
		};
		image: string;
		episode: string[];
		url: string;
		created: string;
	}[];
}

export interface CharactersParams {
	page: number;
}
