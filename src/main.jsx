// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App.jsx';
// import { BrowserRouter } from 'react-router-dom';
// import { store } from './Reduxstore/store';
// import { Provider } from 'react-redux';
// import Cookies from 'js-cookie';
// import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client';
// import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
// import { createClient } from "graphql-ws";
// import { getMainDefinition } from '@apollo/client/utilities';

// // Retrieve the JWT token
// const getAuthToken = () => Cookies.get('jwt_token');

// // Log the token for debugging
// const token = getAuthToken();
// console.log('JWT Token:', token);

// // Define the HTTP link
// const httpLink = new HttpLink({
//   uri: 'https://coherent-skink-69.hasura.app/v1/graphql',
//   headers: {
//     'Authorization': token ? `Bearer ${token}` : '',
//     'x-hasura-admin-secret': 'mPCN2znKe29oVkgGUzMTNMxzLY5bxwuaJYgo1pZ6M8JaQHmCAD72uJTC9IW53Vjf',
//   },
// });

// // Define the WebSocket link
// const wsLink = new GraphQLWsLink(
//   createClient({
//     url: 'wss://coherent-skink-69.hasura.app/v1/graphql',
//     connectionParams: {
//       headers: {
//         'Authorization': token ? `Bearer ${token}` : '',
//         'x-hasura-admin-secret': 'mPCN2znKe29oVkgGUzMTNMxzLY5bxwuaJYgo1pZ6M8JaQHmCAD72uJTC9IW53Vjf',
//       },
//     },
//   })
// );

// // Use splitLink to handle subscriptions and queries/mutations
// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink
// );

// // Configure Apollo Client
// const client = new ApolloClient({
//   link: splitLink,
//   cache: new InMemoryCache(),
// });

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={store}>
//       <ApolloProvider client={client}>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </ApolloProvider>
//     </Provider>
//   </StrictMode>
// );
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

