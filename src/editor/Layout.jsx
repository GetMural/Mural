import React from 'react';
import Navigation from './Navigation';

const Layout = props => {
  const { children } = props;
  return (
    <div className="row">
      <div className="col-1">
        <div
          className="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <Navigation />
        </div>
      </div>
      <div className="col-11">
        <div className="tab-content" id="v-pills-tabContent">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
