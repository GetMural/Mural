import {
  createSelector,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit'
import { AppThunk, RootState } from 'store/store'
import convertToPlainText from 'utils/convertToPlainText'

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

interface EmptyItem {
  id: string
  type: ItemTypes
}

interface Image {
  path: string
  thumbnail: string
}

export interface Video {
  path: string
}

export interface Audio {
  path: string
}

export interface RichText {
  contentState: string
}

interface BackgroundVideoItem extends EmptyItem {
  type: 'backgroundVideo'
  video?: Video
  fullPage?: boolean
  navigationTitle?: string
  title?: RichText
  subtitle?: string
  text?: string
  posterImage?: Image
}

interface EmbedVideo extends EmptyItem {
  type: 'embedVideo'
  link?: string
  showControls?: boolean
}

interface Slide {
  slideTitle: string
  image: Image
  slideImageAltText: string
  slideCredits: string
}

interface HorizontalSlideshow extends EmptyItem {
  type: 'horizontalSlideshow'
  navigationTitle?: string
  slideShowTitle?: RichText
  slides?: Slide[]
}

export interface TextItem extends EmptyItem {
  type: 'text'
  navigationTitle?: string
  title?: RichText
  subtitle?: string
  introduction?: string
}

export interface ImageAudio extends EmptyItem {
  type: 'imageAudio'
  image?: string
  fullPage?: boolean
  altText?: string
  audio?: string
  navigationTitle?: string
  title?: RichText
  subtitle?: string
}

interface FullpageVideo extends EmptyItem {
  type: 'fullpageVideo'
  representativeImage?: Image
  imageAltText?: string
  loopVideo?: boolean
}

export type Items =
  | EmptyItem
  | BackgroundVideoItem
  | TextItem
  | EmbedVideo
  | ImageAudio
  | HorizontalSlideshow
  | FullpageVideo

export interface StoryState {
  metadata: {
    title: string
    description: string
    author: string
    canonicalUrl: string
    siteName: string
    siteImage?: Image
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
      reducer: (state, action: PayloadAction<EmptyItem>) => {
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
    setItems: (state, action: PayloadAction<Items[]>) => {
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

const storySelector = (state: RootState) => state.story
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

export const enrichedStorySelector = createSelector(storySelector, (story) => {
  return {
    ...story,
    items: story.items?.map((item) => {
      let enrichedItem = {}
      Object.keys(item).forEach((key) => {
        // @ts-ignore
        let value: any = item[key]
        // @ts-ignore
        enrichedItem[key] = value
        if ('contentState' in value) {
          // @ts-ignore
          enrichedItem[key].plainText = convertToPlainText(value)
        }
        // @ts-ignore
        enrichedItem[key] = value
      })
      return enrichedItem
    }),
  }
})

export default story.reducer
