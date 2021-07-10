import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Item {
  type: 'backgroundVideo'
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
    addItem: (state, action) => {
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

export const { saveForm, addItem, reset } = story.actions

export default story.reducer
