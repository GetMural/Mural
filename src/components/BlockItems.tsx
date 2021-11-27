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
  Theme,
  Typography,
} from '@mui/material'
import { darken } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import PaymentIcon from '@mui/icons-material/MonetizationOn'
import { createStyles, makeStyles } from '@mui/styles'
import useRouter from 'hooks/useRouter'
import { ReactSortable } from 'react-sortablejs'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { Items, removeItem, RichText, setItems } from 'store/slices/story'
import clsx from 'clsx'
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    isAfterPaywall: {
      boxShadow: `-${theme.spacing(1)} 0px ${darken(
        theme.palette.primary.main,
        0.3
      )}`,
    },
  })
)

export default function BlockItems() {
  const classes = useStyles()
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
  const paywallPosition = items.findIndex(
    (item) => item.type === 'paywallSeparator'
  )

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
            {items.map((item, idx) => {
              const image = getImagePath(item)
              return idx === paywallPosition ? (
                <PaywallSeparator key={item.id} />
              ) : (
                <ListItem
                  button
                  key={item.id}
                  selected={selectedItem && selectedItem.id === item.id}
                  onClick={() =>
                    goTo({ view: { name: 'item', args: { item } } })
                  }
                  className={clsx({
                    [classes.isAfterPaywall]: idx > paywallPosition,
                  })}
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
  const classes = useStyles()
  return (
    <ListItem
      sx={{
        backgroundColor: 'primary.main',
        cursor: 'move',
        color: 'white',
      }}
      className={classes.isAfterPaywall}
    >
      <ListItemIcon style={{ color: 'inherit' }}>
        <PaymentIcon />
      </ListItemIcon>
      <ListItemText
        sx={{
          color: 'white',
        }}
        primary={TYPES_LABELS['paywallSeparator']}
        secondary={
          <Typography variant="body2">Enabled in payment settings</Typography>
        }
      />
    </ListItem>
  )
}
