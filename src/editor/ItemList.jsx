import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { ReactSortable } from 'react-sortablejs';

import {
  ListGroupItem,
  Button,
  ButtonGroup,
} from '@bootstrap-styled/v4';

function getItemsJson(items) {
  return items.map(item => Object.assign({}, item.toJSON()));
}

const ItemList = props => {
  const { items, setItems } = props;
  const [state, setState] = useState(getItemsJson(items));

  return (
    <>
      <ReactSortable
        tag="ul"
        list={state}
        setList={setState}
        className="list-group"
      >
        {state.map((storyItem, i) => (
          <ListGroupItem key={storyItem.id}>
            <Link to={`${i}`}>{storyItem.type}</Link>
            <Button color="danger" onClick={storyItem.remove}>
              Delete
            </Button>
          </ListGroupItem>
        ))}
      </ReactSortable>
      <ButtonGroup>
        <Button
          color="warning"
          onClick={() => {
            setState(getItemsJson(items));
          }}
        >
          Reset
        </Button>
        <Button
          color="success"
          onClick={() => {
            setItems(state);
          }}
        >
          Save
        </Button>
      </ButtonGroup>
    </>
  );
};

export default observer(ItemList);
