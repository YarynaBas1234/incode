import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import { GlobalStyles, theme, ThemeProvider } from 'styles';
import { store } from 'redux/store';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './assets/_fonts.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<GlobalStyles />
					<App />
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
