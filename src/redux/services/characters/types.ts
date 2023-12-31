import { IResponsePageInfo, RequestParams } from 'redux/types';
import { ICharacter } from 'types/character';

export interface ICharactersResponse {
	info: IResponsePageInfo;
	results: ICharacter[];
}

export interface ICharactersResponseNormalized extends ICharactersResponse{
	charactersIds: number[];
}

export interface ICharactersParams extends RequestParams {
	page?: number;
	name?: string;
	status?: string;
	species?: string;
	type?: string;
	gender?: string;
}
