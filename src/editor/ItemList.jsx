import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import {
  ListGroup,
  ListGroupItem,
  Button,
} from '@bootstrap-styled/v4';

const ItemList = props => {
  const { items } = props;

  return (
    <ListGroup>
      {items.map((storyItem, i) => (
        <ListGroupItem key={storyItem.id}>
          <Link to={`${i}`}>{storyItem.type}</Link>
          <Button color="danger" onClick={storyItem.remove}>
            Delete
          </Button>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default observer(ItemList);
