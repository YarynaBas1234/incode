export const getAllDublicates = (arrays: number[][]) => {
	const count = arrays.flat().reduce<Record<number, number>>((acc, item) => {
		acc[item] = (acc[item] || 0) + 1;
		return acc;
	}, {});
	return Object.entries(count).reduce<number[]>((acc, [id, dublicates]) => {
		if (dublicates === arrays.length) {
			acc.push(Number(id));
		}
		return acc;
	}, []);
};
