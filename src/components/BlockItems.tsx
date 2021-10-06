import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import useRouter from 'hooks/useRouter'
import { ReactSortable } from 'react-sortablejs'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { removeItem, setItems } from 'store/slices/story'
import useAskToSaveChanges from 'hooks/useAskToSaveChanges'
import { goToView } from 'store/slices/navigation'
import React from 'react'
import { isEqual } from 'lodash'
import TYPES_LABELS from 'constantes/blockTypes'

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

  if (!items || items.length < 1) {
    return null
  }

  return (
    <div>
      <Typography variant="h5">Story Order</Typography>
      <Divider />
      <List>
        {items && (
          <ReactSortable
            list={items}
            setList={(newItemsOrder) => {
              if (
                // order is different
                !isEqual(
                  items.map((i) => i.id),
                  newItemsOrder.map((i) => i.id)
                )
              ) {
                askToSaveChanges().then((res) => {
                  // we don't save new order when items have been saved in between
                  // because then, value of `newItemsOrder` is outdated.
                  if (res && res !== 'saved') {
                    dispatch(setItems(newItemsOrder))
                  }
                })
              }
            }}
            animation={200}
            delayOnTouchStart={true}
          >
            {items.map((item) =>
              item.type === 'paywallSeparator' ? (
                <PaywallSeparator key={item.id} />
              ) : (
                <ListItem
                  button
                  key={item.id}
                  selected={selectedItem && selectedItem.id === item.id}
                  onClick={() =>
                    goTo({ view: { name: 'item', args: { item } } })
                  }
                >
                  <ListItemText
                    primary={
                      'navigationTitle' in item
                        ? item.navigationTitle
                        : undefined
                    }
                    secondary={TYPES_LABELS[item.type]}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        // if current item, we don't need to check unsaved changes or not valid form
                        if (selectedItem && selectedItem.id === item.id) {
                          dispatch(removeItem(item.id))
                          dispatch(goToView(null))
                        } else {
                          askToSaveChanges().then((res) => {
                            if (res) {
                              dispatch(removeItem(item.id))
                            }
                          })
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            )}
          </ReactSortable>
        )}
      </List>
    </div>
  )
}

function PaywallSeparator() {
  return (
    <ListItem style={{ cursor: 'move' }}>
      <ListItemText primary={TYPES_LABELS['paywallSeparator']} />
    </ListItem>
  )
}
