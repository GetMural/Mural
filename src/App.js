/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './App.css';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Editor, { Settings, Preview } from './editor';
import StoryModel, { WorkspaceSettings } from './models/StoryModel';

const electron = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const FileManager = require('./FileManager');

const fileManager = new FileManager({ storyName: 'Test' });

const storyJson = fileManager.read();
const config = fileManager.readSettings();
const settingsTree = WorkspaceSettings.create(config);

const storyTree = StoryModel.create(storyJson, {
  fileManager,
});

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
            <button
              type="button"
              onClick={() => {
                const win = new electron.remote.BrowserWindow({
                  width: 1280,
                  height: 700,
                  webPreferences: {
                    nodeIntegration: true,
                  },
                });
                win.loadURL(
                  isDev
                    ? 'http://localhost:3000/#/preview'
                    : `file://${path.join(
                        __dirname,
                        '../build/index.html#/preview',
                      )}`,
                );
              }}
            >
              Preview
            </button>
          </div>
        </div>
        <div className="col-11">
          <div className="tab-content" id="v-pills-tabContent">
            <Switch>
              <Route path="/preview" component={Preview} />
              <Route
                path="/settings"
                render={props => (
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <Settings {...props} config={settingsTree} />
                )}
              />
              <Route
                path="/:itemNum"
                exact
                render={props => (
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <Editor {...props} story={storyTree} />
                )}
              />
              <Route path="">
                <ul>
                  {storyTree.items.map((storyItem, i) => (
                    <li key={i}>
                      <Link to={`${i}`}>{storyItem.type}</Link>
                    </li>
                  ))}
                </ul>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}
