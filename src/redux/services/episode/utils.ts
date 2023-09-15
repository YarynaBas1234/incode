import { getIdFromCharacterUrls } from 'redux/utils';

import { IEpisodesResponse, IEpisodeResponseNormalized } from './types';

export const normalizeEpisodesResponse = (response: IEpisodesResponse): IEpisodeResponseNormalized => {
	return {
		...response,
		charactersIds: response.results.reduce<number[]>((acc, item) => {
			return [...new Set(acc.concat(getIdFromCharacterUrls(item.characters)))];
		}, []),
	};
};
