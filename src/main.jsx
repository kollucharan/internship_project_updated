import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom'
import { store } from './Reduxstore/store'
import { Provider } from 'react-redux'
import Cookies from 'js-cookie'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const getAuthToken = () => {
  return Cookies.get('jwt_token'); // Replace with your logic to fetch the token
};

const client = new ApolloClient({
  uri: 'https://coherent-skink-69.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret':' mPCN2znKe29oVkgGUzMTNMxzLY5bxwuaJYgo1pZ6M8JaQHmCAD72uJTC9IW53Vjf',
   
      'Authorization': `Bearer ${getAuthToken()}`, // Attach JWT token to headers
    
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <ApolloProvider client={client}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ApolloProvider>
    </Provider>
  </StrictMode>,
)
