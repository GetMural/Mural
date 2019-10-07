import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { WorkspaceProvider } from './WorkspaceContext';

ReactDOM.render(
  <WorkspaceProvider>
    <App />
  </WorkspaceProvider>,
  document.getElementById('root'),
);
