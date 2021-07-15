import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'
import useRouter from 'hooks/useRouter'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import DeleteIcon from '@material-ui/icons/Delete'
import { removeItem } from 'store/slices/story'
import useAskToSaveChanges from 'hooks/useAskToSaveChanges'
import { goToView } from 'store/slices/navigation'

export default function BlockItems() {
  const items = useAppSelector((state) => state.story.items)
  const dispatch = useAppDispatch()
  const selectedItem = useAppSelector(
    (state) =>
      state.navigation.view?.name === 'item' &&
      state.navigation.view?.args?.item
  )
  const askToSaveChanges = useAskToSaveChanges()

  const { goTo } = useRouter()

  return (
    <div>
      <List>
        {items &&
          items.map((item) => (
            <ListItem
              button
              key={item.uid}
              selected={selectedItem && selectedItem.uid === item.uid}
              onClick={() => goTo({ view: { name: 'item', args: { item } } })}
            >
              <ListItemText primary={item.type} secondary={item.title} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    // if current item, we don't need to check unsaved changes or not valid form
                    if (selectedItem && selectedItem.uid === item.uid) {
                      dispatch(removeItem(item.uid))
                      dispatch(goToView(null))
                    } else {
                      askToSaveChanges().then((res) => {
                        if (res) {
                          dispatch(removeItem(item.uid))
                        }
                      })
                    }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </div>
  )
}
