import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppProvider from './context/index';
import Routes from './routes';

import GlobalStyles from './styles/global';

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <Routes />
    </AppProvider>

    <GlobalStyles />
  </BrowserRouter>
);

export default App;
