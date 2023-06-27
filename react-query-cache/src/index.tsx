import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {QueryClient, QueryClientProvider} from 'react-query';
import { Auth0Provider, Auth0ProviderOptions, AuthorizationParams } from '@auth0/auth0-react';
import { ReactQueryDevtools } from 'react-query/types/devtools';

const auth0ProviderProps: Auth0ProviderOptions = {
  clientId: 'XV6W9RnO29udH7y3JzYvT4noULLlQfzq',
  domain: 'dev-auth.shipwell.com',
  authorizationParams: {
    redirect_uri: 'http://localhost:3000/',
    audience: 'https://dev-api.shipwell.com',
  } as AuthorizationParams
};
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
    <Auth0Provider {...auth0ProviderProps}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
