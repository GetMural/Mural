import {
  createSelector,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit'
import { RGBColor } from 'react-color'
import { AppThunk, RootState } from 'store/store'
import convertToPlainText from 'utils/convertToPlainText'

import { goToView } from './navigation'

type ImageRendition = {
  size: {
    width: number
    height: number
  }
  path: string
}
export interface Image {
  small: ImageRendition
  medium: ImageRendition
  big: ImageRendition
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

export interface Embed {
  id: string
  url: string
  source: 'youtube' | 'vimeo' | 'dailymotion'
  embed: string
}

interface BackgroundImage {
  id: string
  type: 'backgroundImage'
  fullPage?: boolean
  altText?: string
  image?: Image
  navigationTitle?: string
  title?: RichText
  subtitle?: RichText
  text?: RichText
}

interface ParallaxImage {
  id: string
  type: 'parallaxImage'
  navigationTitle?: string
  title?: string
  subtitle?: RichText
  image?: Image
}

interface BackgroundVideoItem {
  id: string
  type: 'backgroundVideo'
  video?: Video
  fullPage?: boolean
  navigationTitle?: string
  title?: string
  subtitle?: string
  text?: RichText
  posterImage?: Image
  backgroundTextColor?: RGBColor
}

interface EmbedVideo {
  id: string
  navigationTitle?: string
  type: 'embedVideo'
  link?: string
  showControls?: boolean
  autoAdvance?: boolean
  embed?: Embed
}

interface Slide {
  slideTitle?: string
  image?: Image
  slideImageAltText?: string
  slideCredits?: string
}

interface HorizontalSlideshow {
  id: string
  type: 'horizontalSlideshow'
  navigationTitle?: string
  slideShowTitle?: RichText
  slides?: Slide[]
}

interface VerticalSlideshow {
  id: string
  type: 'verticalSlideshow'
  navigationTitle?: string
  slideShowTitle?: RichText
  slides?: Slide[]
}

export interface TextItem {
  id: string
  type: 'text'
  navigationTitle?: string
  title?: string
  subtitle?: RichText
  introduction?: RichText
}

export interface ImageAudio {
  id: string
  type: 'imageAudio'
  light?: boolean
  image?: Image
  fullPage?: boolean
  altText?: string
  audio?: Audio
  navigationTitle?: string
  title?: string
  subtitle?: string
}

export interface FullpageVideo {
  id: string
  type: 'fullpageVideo'
  text?: RichText
  video?: Video
  representativeImage?: Image
  imageAltText?: string
  loopVideo?: boolean
}

export interface PaywallSeparator {
  id: string
  type: 'paywallSeparator'
}

export type Items =
  | BackgroundImage
  | TextItem
  | EmbedVideo
  | ImageAudio
  | HorizontalSlideshow
  | VerticalSlideshow
  | FullpageVideo
  | PaywallSeparator
  | ParallaxImage
  | BackgroundVideoItem

export type ItemTypes = Items['type']

export interface StoryState {
  metadata: {
    title: string
    description: string
    author: string
    canonicalUrl: string
    siteName: string
    siteImage?: Image
    googleAnalyticsId: string
    rssPingbkack: string
  }
  items: Items[]
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
      reducer: (state, action: PayloadAction<{ type: any; id: string }>) => {
        state.items = [
          ...(state.items || []),
          {
            type: action.payload.type,
            id: action.payload.id,
          },
        ]
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
    unshiftPaywallSeparator: (state) => {
      state.items?.unshift({
        type: 'paywallSeparator',
        id: nanoid(),
      })
    },
    removePaywallSeparator: (state) => {
      let paywallSeparatorIndex = state.items?.findIndex(
        (i) => i.type === 'paywallSeparator'
      )
      if (paywallSeparatorIndex !== undefined && paywallSeparatorIndex > -1) {
        state.items?.splice(paywallSeparatorIndex, 1)
      }
    },
    reset: () => ({ ...initialState }),
  },
})

export const {
  saveForm,
  removeItem,
  addItem,
  setItems,
  reset,
  unshiftPaywallSeparator,
  removePaywallSeparator,
} = story.actions

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
