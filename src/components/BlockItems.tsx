import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import PaymentIcon from '@mui/icons-material/MonetizationOn'
import useRouter from 'hooks/useRouter'
import { ReactSortable } from 'react-sortablejs'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { Items, removeItem, RichText, setItems } from 'store/slices/story'
import useAskToSaveChanges from 'hooks/useAskToSaveChanges'
import { goToView } from 'store/slices/navigation'
import { isEqual } from 'lodash'
import TYPES_LABELS from 'constantes/blockTypes'
import convertToPlainText from 'utils/convertToPlainText'
import getMediaPath from 'utils/getMediaPath'

function getPrimaryName(item: Items) {
  function richTextOrString(input: string | RichText) {
    if (typeof input === 'object') {
      return convertToPlainText(input)
    }
    return input
  }
  if ('navigationTitle' in item && item.navigationTitle) {
    return item.navigationTitle
  }
  if ('title' in item && item.title) {
    return richTextOrString(item.title)
  }
  if ('subtitle' in item && item.subtitle) {
    return richTextOrString(item.subtitle)
  }
}

function getImagePath(item: Items) {
  if ('image' in item && item.image?.small.path) {
    return item.image.small.path
  }
  if ('posterImage' in item && item.posterImage?.small.path) {
    return item.posterImage.small.path
  }
  if ('slides' in item && item.slides && item.slides.length > 0) {
    return item.slides[0].image?.small.path
  }
  if ('representativeImage' in item && item.representativeImage) {
    return item.representativeImage.small.path
  }
}

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
            {items.map((item) => {
              const image = getImagePath(item)
              return item.type === 'paywallSeparator' ? (
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
                  {image && (
                    <ListItemAvatar>
                      <Avatar src={'file://' + getMediaPath(image)} />
                    </ListItemAvatar>
                  )}
                  <ListItemText
                    inset={!image}
                    primary={getPrimaryName(item)}
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
                      size="large"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
          </ReactSortable>
        )}
      </List>
    </div>
  )
}

function PaywallSeparator() {
  return (
    <ListItem
      sx={{
        color: 'white',
        backgroundColor: 'primary.main',
        cursor: 'move',
      }}
    >
      <ListItemIcon style={{ color: 'inherit' }}>
        <PaymentIcon />
      </ListItemIcon>
      <ListItemText primary={TYPES_LABELS['paywallSeparator']} />
    </ListItem>
  )
}
