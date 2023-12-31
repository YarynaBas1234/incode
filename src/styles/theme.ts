import { ITheme } from './types';
import { colorVariants } from './variants';

export const theme: ITheme = {
	colors: colorVariants,
	buttonVariants: {
		primary: {
			padding: '16px 46px',
			backgroundColor: colorVariants.white,
			color: colorVariants.black_1,
			fontWeight: '400',
			fontFamily: 'Roboto',
			borderRadius: '4px',
			fontSize: '16px',
			leading: '24px',
			textTransform: 'uppercase',
			cursor: 'pointer',
			hover: {
				backgroundColor: colorVariants.gray,
				color: colorVariants.white,
			},
			active: {
				backgroundColor: colorVariants.gray,
				color: colorVariants.white,
			},
		},
		text: {
			fontSize: '14px',
			fontWeight: '500',
			leading: '36px',
			textTransform: 'uppercase',
			fontFamily: 'Roboto',
			cursor: 'pointer',
			color: colorVariants.blue,

			hover: {
				color: colorVariants.dark_blue,
			},
			active: {
				color: colorVariants.dark_blue,
			},
		},
	},
	inputVariants: {
		filled: {
			fontWeight: '400',
			fontSize: '16px',
			leading: '24px',
			fontFamily: 'Roboto',
			padding: '12px 16px',
			borderRadius: '4px 4px 0 0',
		},
	},
};
