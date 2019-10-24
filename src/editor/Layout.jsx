import React from 'react';
import { Container, Row } from '@bootstrap-styled/v4';
import Navigation from './Navigation';
import ErrorBoundary from './ErrorBoundary';

const Layout = ({ children }) => {
  return (
    <Container className="m-0 p-0" fluid>
      <Row className="no-gutters">
        <div
          className="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <Navigation />
        </div>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Row>
    </Container>
  );
};

export default Layout;
