import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop';
import GlobalStyle from './styles/globalstyles';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

import store from './redux/store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const persistor = persistStore(store);
const queryClient = new QueryClient();

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <ScrollToTop />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </PersistGate>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
