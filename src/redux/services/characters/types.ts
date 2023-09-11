import { ResponsePageInfo } from 'redux/types';
import { CharacterStatus } from 'types/character';

export interface ICharacter {
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
}
export interface ICharactersResponse {
	info: ResponsePageInfo;
	results: ICharacter[];
}

export interface CharactersParams {
	page: number;
}

export interface CharacterIDParams {
	id: number;
}
