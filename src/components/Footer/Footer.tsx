import { Body, GitHubIcon, LikeItem, TwitterIcon } from 'components';
import { styled, theme } from 'styles';
import {ReactComponent as FooterLogo} from 'assets/images/footer-logo.svg'

const FooterWrapper = styled.footer`
	padding: 50px 0 80px 0;
	background-color: ${theme.colors.black};
	min-width: 200px;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: hidden;
`;

const FooterTitle = styled(Body)`
	position: relative;
	max-width: 212px;
	width: 100%;
	color: ${theme.colors.gray_1};
	text-transform: uppercase;
	text-align: center;
	z-index: 1;
`;

const FooterLogoContainer = styled.div`
	position: relative;
	width: 150px;
	height: 150px;
`;

const FooterLogoGradient = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: -25px;
	left: -12.5px;
	width: 175px;
	height: 175px;
	border-radius: 50%;
	background: radial-gradient(rgba(255, 255, 255, 0.22), transparent 67%);
	z-index: 0;
`;

const FooterLogoStyled = styled(FooterLogo)`
	width: 50px;
	height: 50px;
`;

const ContactContainer = styled.div`
	max-width: 130px;
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

const DateContainer = styled.div`
	display: flex;
	justify-content: center;
	color: ${theme.colors.gray_1};
	margin-top: 27px;
`;

export const Footer = () => {
	return (
		<FooterWrapper>
			<FooterTitle fontWeight={700} fontSize='13.5px' leading='22px'>
				performed as part of a test case for the company
			</FooterTitle>
			<FooterLogoContainer>
				<FooterLogoGradient>
				<FooterLogoStyled />
				</FooterLogoGradient >
			</FooterLogoContainer>
			<ContactContainer>
				<GitHubIcon />
				<TwitterIcon />
				<LikeItem />
			</ContactContainer>
			<DateContainer>2023</DateContainer>
		</FooterWrapper>
	);
};
