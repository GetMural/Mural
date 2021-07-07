import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface StoryMetdataState {
  title: string
  description: string
  author: string
  canonicalUrl: string
  siteName: string
  siteImage: string
  monetizeStory: boolean
  googleAnalyticsId: string
  rss_pingbkack: string
}

// Define the initial state using that type
const initialState: StoryMetdataState = {
  title: '',
  description: '',
  author: '',
  canonicalUrl: '',
  siteName: '',
  siteImage: '',
  monetizeStory: false,
  googleAnalyticsId: '',
  rss_pingbkack: '',
}

export const storyMetadata = createSlice({
  name: 'storyMetadata',
  initialState,
  reducers: {
    saveForm: (state, action: PayloadAction<StoryMetdataState>) => {
      return action.payload
    },
  },
})

export const { saveForm } = storyMetadata.actions

export default storyMetadata.reducer
