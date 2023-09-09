import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { theme, ThemeProvider } from 'styles';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<ThemeProvider theme={theme}>
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	</ThemeProvider>
);

reportWebVitals();
