import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCogs,
  faEye,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';

const electron = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

const Button = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  text-align: inherit;
`;

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact>
            <FontAwesomeIcon icon={faHome} size="2x" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/story" exact>
            <FontAwesomeIcon icon={faNewspaper} size="2x" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" exact>
            <FontAwesomeIcon icon={faCogs} size="2x" />
          </NavLink>
        </li>
        <li>
          <Button>
            <FontAwesomeIcon
              icon={faEye}
              size="2x"
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
            />
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
