import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Auth0ProviderWithHistory from "./components/Auth/auth0-provider-with-history";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import App from "./components/App";
import "./styles/App.css";

const client = new ApolloClient({
  uri: 'https://loving-lemming-25.hasura.app/v1/graphql',
  headers: {
    "Access-Control-Allow-Origin": "*",
    "X-Hasura-Admin-Secret":
      "shahzaibbalochrind",
  },
  cache: new InMemoryCache(),
});

export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithHistory>
        <ApolloProvider client={client}>
        <App />
        </ApolloProvider>
      </Auth0ProviderWithHistory>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
