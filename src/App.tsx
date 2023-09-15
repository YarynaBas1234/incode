import { Route, Routes } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

import { RoutePathConst } from 'consts';
import HomePage from 'pages/HomePage';
import ProfilePage from 'pages/ProfilePage';
import { Footer, Header } from 'components';

import 'react-toastify/dist/ReactToastify.css';

const App = () => (
	<>
		<Header />
		<Routes>
			<Route path={RoutePathConst.Home} element={<HomePage />} />
			<Route path={`${RoutePathConst.Profile}:id`} element={<ProfilePage/>} />
		</Routes>
		<ToastContainer />
		<Footer />
	</>
);

export default App;
