import { Route, Routes } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import { RoutePathConst } from 'consts';
import HomePage from 'pages/HomePage';
import ProfilePage from 'pages/ProfilePage';
import { Header } from 'components';
import 'react-toastify/dist/ReactToastify.css';


const App = () => (
	<>
		<Header />
		<Routes>
			<Route path={RoutePathConst.Home} element={<HomePage />} />
			<Route path={RoutePathConst.Profile} element={<ProfilePage/>} />
		</Routes>
		<ToastContainer />
	</>
);

export default App;
