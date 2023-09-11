import { TextField } from '@mui/material';
import { styled, theme } from 'styles';

import { InputVariantsType } from 'styles/types';

interface IInputProps extends React.ComponentPropsWithoutRef<'input'> {
	label: string;
	variant: InputVariantsType;
}

const StyledInput = styled(TextField)<IInputProps>`
	font-family: ${({ theme, variant }) => theme.inputVariants[variant].fontFamily};
	font-size: ${({ theme, variant }) => theme.inputVariants[variant].fontSize};
	line-height: ${({ theme, variant }) => theme.inputVariants[variant].leading};
	padding: ${({ theme, variant }) => theme.inputVariants[variant].padding};
	border-radius: ${({ theme, variant }) => theme.inputVariants[variant].borderRadius};

	.MuiInputBase-root {
		background-color: ${theme.colors.white};
	}
	.MuiInputLabel-root {
		color: ${theme.colors.black_1};
		font-size: 16px;
	}
	.MuiInputBase-root.MuiFilledInput-root:hover {
		background-color: ${theme.colors.white};
	}
`;

export const Input: React.FC<IInputProps> = (props) => {
	const { label, variant } = props;

	return <StyledInput label={label} variant={variant} />;
};
