import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { MatchNotificationProvider } from './context/MatchNotificationContext';
import App from './App';
import { loadRuntimeApiBaseUrl } from './services/runtimeConfig';
import './styles.css';

// GitHub Pages has no server-side SPA fallback. Hash routes keep shared links and
// browser refreshes working there, while local and standalone deployments retain
// clean browser-history URLs.
const Router = import.meta.env.BASE_URL === '/LOST_QUEST_/' ? HashRouter : BrowserRouter;

function render() {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Router>
        <AppProvider><MatchNotificationProvider><App /></MatchNotificationProvider></AppProvider>
      </Router>
    </React.StrictMode>,
  );
}

// Read the current tunnel address (if configured) before the first API request; falls back within 3 seconds.
void loadRuntimeApiBaseUrl().finally(render);
