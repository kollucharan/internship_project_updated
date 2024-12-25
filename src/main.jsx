import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom'
import { store } from './Reduxstore/store'
import { Provider } from 'react-redux'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
const client = new ApolloClient({
  uri: 'https://coherent-skink-69.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret':' mPCN2znKe29oVkgGUzMTNMxzLY5bxwuaJYgo1pZ6M8JaQHmCAD72uJTC9IW53Vjf',
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
