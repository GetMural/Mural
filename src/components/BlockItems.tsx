import { List, ListItem, ListItemText } from '@material-ui/core'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setView } from 'store/slices/navigation'

export default function BlockItems() {
  const items = useAppSelector((state) => state.story.items)
  const selecteditemIndex = useAppSelector(
    (state) => state.navigation.view?.args?.index
  )
  const dispatch = useAppDispatch()
  return (
    <div>
      <List>
        {items &&
          items.map((item, i) => (
            <ListItem
              button
              key={i}
              selected={
                Number.isInteger(selecteditemIndex) && selecteditemIndex === i
              }
              onClick={() =>
                dispatch(setView({ name: 'item', args: { item, index: i } }))
              }
            >
              <ListItemText primary={item.type} secondary={item.title} />
            </ListItem>
          ))}
      </List>
    </div>
  )
}
