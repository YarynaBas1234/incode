import { Route, Routes } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import { styled } from 'styles';
import { RoutePathConst } from 'consts';
import HomePage from 'pages/HomePage';
import ProfilePage from 'pages/ProfilePage';
import { Header } from 'components';
import 'react-toastify/dist/ReactToastify.css';

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
			<Route path={RoutePathConst.Profile} element={<ProfilePage/>} />
		</Routes>
		<ToastContainer />
	</Wrapper>
);

export default App;
