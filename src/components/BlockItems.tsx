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
  const selecteditemIndex = useAppSelector(
    (state) => state.navigation.view?.args?.index
  )
  const askToSaveChanges = useAskToSaveChanges()

  const { goTo } = useRouter()

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
                goTo({ view: { name: 'item', args: { item, index: i } } })
              }
            >
              <ListItemText primary={item.type} secondary={item.title} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    // if current item, we don't need to check unsaved changes or not valid form
                    if (selecteditemIndex === i) {
                      dispatch(removeItem(i))
                      dispatch(goToView(null))
                    } else {
                      askToSaveChanges()
                        .then(() => dispatch(removeItem(i)))
                        .catch(() => {
                          console.log('wut ?')
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
