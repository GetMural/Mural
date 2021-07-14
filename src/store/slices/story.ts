import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'store/store'
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
  type: ItemTypes
}
export interface BackgroundVideoItem extends Item {
  title?: string
}

type Items = BackgroundVideoItem

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
    removeItem: (state, action: PayloadAction<number>) => {
      state.items?.splice(action.payload, 1)
    },
    addItem: (state, action: PayloadAction<ItemTypes>) => {
      state.items = [
        ...(state.items || []),
        {
          type: action.payload,
        },
      ]
    },
    reset: () => {
      return { ...initialState }
    },
  },
})

export const { saveForm, removeItem, addItem, reset } = story.actions

export const addItemAndGoToView =
  (itemType: ItemTypes): AppThunk =>
  (dispatch, getState) => {
    dispatch(addItem(itemType))
    const items = getState().story.items
    if (items) {
      const index = (items.length || 1) - 1
      const item = items[index]
      dispatch(goToView({ name: 'item', args: { item, index } }))
    }
  }
export default story.reducer
