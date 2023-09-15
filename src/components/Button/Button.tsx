import Button from '@mui/material/Button';

import { ButtonsVariantsType, styled } from 'styles';

interface IButtonBaseStyledProps {
	variant: ButtonsVariantsType;
	isSecondary?: boolean;
	isLong?: boolean;
}

interface IButtonProps extends React.ComponentPropsWithoutRef<'button'> {
	variant: ButtonsVariantsType;
	text: string;
	isDisabled?: boolean;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
}

const ButtonBaseStyled = styled(Button)<IButtonBaseStyledProps>`
	&.MuiButton-root {
		padding: ${({ theme, variant }) => theme.buttonVariants[variant].padding};
		background-color: ${({ theme, variant }) => theme.buttonVariants[variant].backgroundColor};
		color: ${({ theme, variant }) => theme.buttonVariants[variant].color};
		border-radius: ${({ theme, variant }) => theme.buttonVariants[variant].borderRadius};
		cursor:  ${({ theme, variant }) => theme.buttonVariants[variant].cursor};
		text-transform: ${({ theme, variant }) => theme.buttonVariants[variant].textTransform};
		font-family: ${({ theme, variant }) => theme.buttonVariants[variant].fontFamily};
		font-weight: ${({ theme, variant }) => theme.buttonVariants[variant].fontWeight};
		font-size: ${({ theme, variant }) => theme.buttonVariants[variant].fontSize};
		line-height: ${({ theme, variant }) => theme.buttonVariants[variant].leading};
		transition: all ease 0.3s;
		white-space: nowrap;
		
		&:hover {
			color: ${({ theme, variant }) => theme.buttonVariants[variant].hover.color};
			background: ${({ theme, variant }) => theme.buttonVariants[variant].hover.backgroundColor};
		}
		&:active {
			color: ${({ theme, variant }) => theme.buttonVariants[variant].active.color};
			background: ${({ theme, variant }) => theme.buttonVariants[variant].active.backgroundColor};
		}
	}
`;

export const ButtonBase: React.FC<IButtonProps> = (props) => {
	const { text, variant, onClick, className, type='button' } = props;

	return (
		<ButtonBaseStyled onClick={onClick} className={className} variant={variant} type={type}>
			{text}
		</ButtonBaseStyled>
	);
};
