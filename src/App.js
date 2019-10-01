/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './App.css';
import {
 HashRouter as Router, Switch, Route, Link 
} from 'react-router-dom';
import { unprotect } from 'mobx-state-tree';
import ImageBackgroundForm from './editor/ImageBackgroundForm';

import Settings from './settings/Settings';
import SettingsModel from './models/Settings';

const electron = require('electron');
const path = require('path');

const USER_DATA_PATH = (electron.app || electron.remote.app).getPath(
  'userData',
);

let config;
try {
  config = JSON.parse(path.join(USER_DATA_PATH, 'settings.json'));
} catch (error) {
  // file doesn't exist
  config = {};
}

const settingsTree = SettingsModel.create(config);
unprotect(settingsTree);

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Editor</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/settings">
            <Settings config={settingsTree} />
          </Route>
          <Route path="/">
            <ImageBackgroundForm config={settingsTree} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
