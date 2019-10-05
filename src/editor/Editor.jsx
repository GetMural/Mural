import React from 'react';
import { observer } from 'mobx-react';
import {
 clone, unprotect, applySnapshot, getSnapshot 
} from 'mobx-state-tree';
import {
 HashRouter as Router, Switch, Route, Link 
} from 'react-router-dom';
import ImageBackgroundForm from './ImageBackgroundForm';

const Editor = (props) => {
  const {
    story: { items },
    match: {
      params: { itemNum },
    },
  } = props;

  const storyIndex = parseInt(itemNum, 10);
  const item = items[storyIndex];
  const clonedItem = clone(item);

  return (
    <ImageBackgroundForm
      draftItem={clonedItem}
      onSave={() => {
        applySnapshot(items[storyIndex], getSnapshot(clonedItem));
      }}
    />
  );
};

export default observer(Editor);
