import styled from 'styled-components';
import { ButtonsVariantsType } from 'styles/types';

interface IButtonBaseStyledProps {
	variant: ButtonsVariantsType;
	isSecondary?: boolean;
	isLong?: boolean;
}

interface IButtonProps extends React.ComponentPropsWithoutRef<'button'> {
	variant: ButtonsVariantsType;
	text: string;
	isDisabled?: boolean;
	onClick: () => void;
}

const ButtonBase = styled.button<IButtonBaseStyledProps>`
	padding: ${({ theme, variant }) => theme.buttonVariants[variant].padding};
	background-color: ${({ theme, variant }) => theme.buttonVariants[variant].backgroundColor};
	color: ${({ theme, variant }) => theme.buttonVariants[variant].color};
	border-radius: ${({ theme, variant }) => theme.buttonVariants[variant].borderRadius};
	cursor:  ${({ theme, variant }) => theme.buttonVariants[variant].cursor};
	text-transform: ${({ theme, variant }) => theme.buttonVariants[variant].textTransform};
	font-family: ${({ theme, variant }) => theme.buttonVariants[variant].fontFamily};
	font-size: ${({ theme, variant }) => theme.buttonVariants[variant].fontSize};
	line-height: ${({ theme, variant }) => theme.buttonVariants[variant].leading};
	transition: all ease 0.3s;
	&:hover {
		color: ${({ theme, variant }) => theme.buttonVariants[variant].hover.color};
		background: ${({ theme, variant }) => theme.buttonVariants[variant].hover.backgroundColor};
	}
	&:active {
		color: ${({ theme, variant }) => theme.buttonVariants[variant].active.color};
		background: ${({ theme, variant }) => theme.buttonVariants[variant].active.backgroundColor};
	}
`;

export const Button: React.FC<IButtonProps> = (props) => {
	const { text, variant, onClick, className } = props;
	return (
		<ButtonBase onClick={onClick} className={className} variant={variant}>
			{text}
		</ButtonBase>
	);
};
