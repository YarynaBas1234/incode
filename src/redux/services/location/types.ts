import { IResponsePageInfo, RequestParams } from 'redux/types';

export interface ILocation {
	id: number;
	name: string;
	type: string;
	dimension: string;
	residents: string[];
	url: string;
	created: string;
}

export interface ILocationResponse {
	info: IResponsePageInfo;
	results: ILocation[];
}

export interface ILocationResponseNormalized extends ILocationResponse{
	charactersIds: number[];
}

export interface ILocationParams extends RequestParams {
	name?: string;
	type?: string;
	dimension?: string;
	page?: number;
}
