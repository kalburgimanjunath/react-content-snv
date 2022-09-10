import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
import { EarthoOneProvider } from '@eartho/one-client-react';

// import { transitions, positions, Provider as AlertProvider } from 'react-alert';
// import AlertTemplate from 'react-alert-template-basic';

// const options = {
//   timeout: 5000,
//   position: positions.BOTTOM_CENTER,
// };
root.render(
  <StrictMode>
    <EarthoOneProvider clientId="9sRcAsKB9YODMjCbrjcH">
      {/* <Provider template={AlertTemplate} {...options}> */}
      <App />
      {/* </Provider> */}
    </EarthoOneProvider>
  </StrictMode>
);
