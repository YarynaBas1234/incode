import { TextField } from '@mui/material';

import { InputVariantsType, styled, theme } from 'styles';

interface IInputProps extends React.ComponentPropsWithoutRef<'input'> {
	name: string;
	label: string;
	variant: InputVariantsType;
	value: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
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
	.MuiInputBase-root.MuiFilledInput-root {
		background-color: ${theme.colors.white};

		&:hover {
			background-color: ${theme.colors.white};
		}
	}
	.MuiInputBase-root.MuiFilledInput-root:hover {
	}
`;

export const Input: React.FC<IInputProps> = (props) => {
	const { name, label, variant, value, onChange, disabled } = props;

	return (
		<StyledInput name={name} label={label} variant={variant} value={value} onChange={onChange} disabled={disabled} />
	);
};
