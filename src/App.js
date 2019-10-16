import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Editor, {
  Settings,
  Preview,
  New,
  StoryListing,
} from './editor';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/preview" exact component={Preview} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/story" exact component={StoryListing} />
        <Route path="/:itemNum" exact component={Editor} />
        <Route path="/" exact component={New} />
      </Switch>
    </Router>
  );
};

export default App;
