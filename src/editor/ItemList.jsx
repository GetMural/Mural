import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

const ItemList = props => {
  const { items } = props;

  return (
    <ul>
      {items.map((storyItem, i) => (
        <li key={i}>
          <Link to={`${i}`}>{storyItem.type}</Link>
        </li>
      ))}
    </ul>
  );
};

export default observer(ItemList);
