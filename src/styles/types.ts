import { colorVariants, buttonVariants, inputVariants } from "./variants";

interface ButtonParams {
	padding?: string;
	width?: number;
	height?: number;
	backgroundColor?: string;
	color?: string;
	border?: string;
	fontWeight: string;
	fontFamily: string;
    borderRadius?: string;
    fontSize: string;
    leading: string;
    textTransform: string;
	cursor: string;
	hover: {
		backgroundColor?: string;
		color: string;
	};
	active: {
		backgroundColor?: string;
		color: string;
	};
}

interface InputParams {
	fontWeight: string;
	fontFamily: string;
    fontSize: string;
    leading: string;
	padding: string;
	borderRadius: string;
}

export type ColorsType = typeof colorVariants;
export type ButtonsVariantsType = ValueOf<typeof buttonVariants>;
export type InputVariantsType = ValueOf<typeof inputVariants>;

export interface ITheme {
	colors: ColorsType;
	buttonVariants: Record<ButtonsVariantsType, ButtonParams>;
	inputVariants: Record<InputVariantsType, InputParams>;
}
