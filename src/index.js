import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/common.scss';
import './styles/style.scss';
import App from './App';
import { BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {RecoilRoot} from "recoil";

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
      <RecoilRoot>
          <QueryClientProvider client={queryClient} >
              <BrowserRouter>
                  <App />
              </BrowserRouter>
          </QueryClientProvider>
      </RecoilRoot>
  </React.StrictMode>
);
