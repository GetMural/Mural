import {
  createSelector,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit'
import { AppThunk, RootState } from 'store/store'
import { goToView } from './navigation'

export type ItemTypes =
  | 'backgroundVideo'
  | 'imageAudio'
  | 'backgroundImage'
  | 'backgroundVideo'
  | 'embedVideo'
  | 'fullpageVideo'
  | 'horizontalSlideshow'
  | 'verticalSlideshow'
  | 'parallaxImage'
  | 'text'
interface Item {
  id: string
  type: ItemTypes
}
export interface BackgroundVideoItem extends Item {
  title?: string
}

export type Items = BackgroundVideoItem

export interface StoryState {
  metadata: {
    title: string
    description: string
    author: string
    canonicalUrl: string
    siteName: string
    siteImage?: string
    monetizeStory: boolean
    googleAnalyticsId: string
    rssPingbkack: string
  }
  items?: Items[]
}

// Define the initial state using that type
const initialState: StoryState = {
  metadata: {
    title: '',
    description: '',
    author: '',
    canonicalUrl: '',
    siteName: '',
    siteImage: undefined,
    monetizeStory: false,
    googleAnalyticsId: '',
    rssPingbkack: '',
  },
  items: [],
}

export const story = createSlice({
  name: 'story',
  initialState,
  reducers: {
    saveForm: (state, action: PayloadAction<StoryState>) => {
      return action.payload
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items?.splice(
        state.items.findIndex((o) => o.id === action.payload),
        1
      )
    },
    addItem: {
      reducer: (state, action: PayloadAction<Item>) => {
        state.items = [...(state.items || []), action.payload]
      },
      prepare: (itemType: ItemTypes) => {
        return {
          payload: {
            id: nanoid(),
            type: itemType,
          },
        }
      },
    },
    // for reordering
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload
    },
    reset: () => {
      return { ...initialState }
    },
  },
})

export const { saveForm, removeItem, addItem, setItems, reset } = story.actions

export const addItemAndGoToView =
  (itemType: ItemTypes): AppThunk =>
  (dispatch, getState) => {
    dispatch(addItem(itemType))
    const items = getState().story.items
    if (items) {
      const index = (items.length || 1) - 1
      const item = items[index]
      dispatch(goToView({ name: 'item', args: { item } }))
    }
  }

const allItemsSelector = (state: RootState) => state.story.items

const selectedItemSelector = (state: RootState) =>
  state.navigation.view?.name === 'item' && state.navigation.view?.args.item

export const selectedItemIndexSelector = createSelector(
  allItemsSelector,
  selectedItemSelector,
  (allItems, selectedItem) => {
    if (selectedItem && allItems) {
      return allItems.findIndex((o) => o.id === selectedItem.id)
    }
  }
)

export default story.reducer
