import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { ListGroupItem, Button } from '@bootstrap-styled/v4';

const ItemList = ({ items, setItems }) => {
  return (
    <>
      {items.map((storyItem, i) => (
        <ListGroupItem key={storyItem.id}>
          <div className="dragging">D</div>
          <Link to={`${i}`}>{storyItem.type}</Link>
          <Button color="danger" onClick={storyItem.remove}>
            Delete
          </Button>
        </ListGroupItem>
      ))}
    </>
  );
};

export default observer(ItemList);
