import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { WorkspaceProvider } from './WorkspaceContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

ReactDOM.render(
  <WorkspaceProvider>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </WorkspaceProvider>,
  document.getElementById('root'),
);
