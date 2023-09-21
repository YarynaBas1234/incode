import { RequestParams } from "./types";

export const getIdFromCharacterUrls = (urls: string[]) => {
	return urls.map((url) => {
		const urlArr = url.split('/');
		return Number(urlArr[urlArr.length - 1]);
	});
};

export const getQueryParams = (params: RequestParams) => {
	return Object.entries(params).filter(([, value]) => Boolean(value))
}
