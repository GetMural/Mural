import React from 'react';
import { Link } from 'react-router-dom';

const electron = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">New</Link>
        </li>
        <li>
          <Link to="/editor">Editor</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
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
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
