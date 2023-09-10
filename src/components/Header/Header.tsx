import HeaderBackgroundImage from 'assets/images/header-background.svg';
import { RoutePathConst } from 'consts';
import { H1, Logo } from 'components';
import { Link } from 'react-router-dom';
import { styled } from 'styles';

const HeaderWrapper = styled.header`
	max-width: 1440px;
	width: 100%;
	padding: 10px 27px 0;
	margin: 0 auto;
`;

const HeaderBackground = styled.div`
	min-height: 345px;
	background-image: url(${HeaderBackgroundImage});
	background-position: center;
	background-repeat: no-repeat;
	display: flex;
    justify-content: center;
    align-items: center;
`;

export const Header = () => (
	<HeaderWrapper>
		<Link to={RoutePathConst.Home}>
			<Logo />
		</Link>
		<HeaderBackground>
			<H1>The Rick and Morty API</H1>
		</HeaderBackground>
	</HeaderWrapper>
);
