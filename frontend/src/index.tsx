import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0ProviderWithHistory } from './auth/auth0-provider-with-history';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Router>
      <Auth0ProviderWithHistory>
          <App />
      </Auth0ProviderWithHistory>
    </Router>
);
