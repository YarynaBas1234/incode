export const getIdFromCharacterUrls = (urls: string[]) => {
	return urls.map((url) => {
		const urlArr = url.split('/');
		return Number(urlArr[urlArr.length - 1]);
	});
};
