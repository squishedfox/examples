import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnReconnect: true,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			staleTime: 3000,
			refetchInterval: false,
			cacheTime: 3000,
		}
	}
});
root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
