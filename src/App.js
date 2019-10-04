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
      <div className="row">
        <div className="col-1">
          <div
            className="nav flex-column nav-pills"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <Link to="/">Editor</Link>
            <Link to="/settings">Settings</Link>
          </div>
        </div>
        <div className="col-11">
          <div className="tab-content" id="v-pills-tabContent">
            <Switch>
              <Route path="/settings">
                <Settings config={settingsTree} />
              </Route>
              <Route path="/">
                <ImageBackgroundForm config={settingsTree} />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}
