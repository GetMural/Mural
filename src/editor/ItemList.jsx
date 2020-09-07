import React, { useRef } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Button } from '@bootstrap-styled/v4';
import { useDrag, useDrop } from 'react-dnd';

const MuralItem = ({ storyItem, moveItem, index }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: 'storyItem',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'storyItem', id: storyItem.id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <li
      ref={ref}
      className="list-group-item d-flex justify-content-between"
      style={{ opacity }}
    >
      <Link to={`${index}`}>{storyItem.type}</Link>
      <Button color="danger" onClick={storyItem.remove}>
        Delete
      </Button>
    </li>
  );
};

const ItemList = ({ items, moveItem }) => {
  return (
    <ul className="list-group">
      {items.map((item, i) => (
        <MuralItem
          key={item.id}
          storyItem={item}
          moveItem={moveItem}
          index={i}
        ></MuralItem>
      ))}
    </ul>
  );
};

export default observer(ItemList);
