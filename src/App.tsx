import { Route, Routes } from 'react-router-dom';
import { styled } from 'styles';
import { RoutePathConst } from 'consts';
import HomePage from 'pages/HomePage';
import ProfilePage from 'pages/ProfilePage';
import { ICharacter } from 'interfaces';
import { Header } from 'components';

const characters: ICharacter[] = [
	{
		id: '1d2f',
		name: 'Valyl',
	},
	{
		id: '1d2d',
		name: 'Ivan',
	},
];

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	box-sizing: border-box;
`;

const App = () => (
	<Wrapper>
		<Header />
		<Routes>
			<Route path={RoutePathConst.Home} element={<HomePage />} />

			{characters?.map((character, i) => (
				<Route key={i} path={RoutePathConst.Profile + character.id} element={<ProfilePage character={character} />} />
			))}
		</Routes>
	</Wrapper>
);

export default App;
