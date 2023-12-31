import { IResponsePageInfo, RequestParams } from 'redux/types';

export interface IEpisode {
	id: number;
	name: string;
	air_date: string;
	episode: string;
	characters: string[];
	url: string;
	created: string;
}

export interface IEpisodesResponse {
	info: IResponsePageInfo;
	results: IEpisode[];
}

export interface IEpisodeResponseNormalized extends IEpisodesResponse{
	charactersIds: number[];
}

export interface IEpisodesParams extends RequestParams {
	name?: string;
	episodes?: string;
	page?: number;
}
