/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './App.css';
import {
 HashRouter as Router, Switch, Route, Link 
} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowCircleRight,
  faArrowCircleLeft,
} from '@fortawesome/free-solid-svg-icons';

import Editor, { Settings } from './editor';
import StoryModel, { WorkspaceSettings } from './models/StoryModel';

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
            {/* <FontAwesomeIcon
              icon={faArrowCircleLeft}
              size="2x"
              onClick={() => {
                settingsTree.editor.previewWidth++;
              }}
            />
            <FontAwesomeIcon
              icon={faArrowCircleRight}
              size="2x"
              onClick={() => {
                settingsTree.editor.previewWidth--;
              }}
            /> */}
          </div>
        </div>
        <div className="col-11">
          <div className="tab-content" id="v-pills-tabContent">
            <Switch>
              <Route
                path="/settings"
                render={(props) => <Settings {...props} config={settingsTree} />}
              />
              <Route
                path="/:itemNum"
                exact
                render={(props) => <Editor {...props} story={storyTree} />}
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
