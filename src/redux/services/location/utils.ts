import { getIdFromCharacterUrls } from 'redux/utils';
import { ILocationResponse, ILocationResponseNormalized } from './types';

export const normalizeLocationsResponse = (response: ILocationResponse): ILocationResponseNormalized => {
	return {
		...response,
		charactersIds: response.results.reduce<number[]>((acc, item) => {
            return [...new Set(acc.concat(getIdFromCharacterUrls(item.residents)))]
        }, [])
	};
};
