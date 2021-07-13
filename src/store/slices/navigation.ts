import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type View = {
  name: 'metadata' | 'item'
  args?: any
} | null

// Define a type for the slice state
export interface NavigationState {
  view: View
  dialog: {
    name: 'UnsavedChangesBeforeViewChange'
    props: { view: View }
  } | null
}

// Define the initial state using that type
const initialState: NavigationState = {
  view: null,
  dialog: null,
}

export const story = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    goToView: (state, action: PayloadAction<NavigationState['view']>) => {
      state.view = action.payload
    },
    openDialog: (state, action: PayloadAction<NavigationState['dialog']>) => {
      state.dialog = action.payload
    },
    closeDialog: (state, action: PayloadAction<void>) => {
      state.dialog = null
    },
    reset: () => {
      return initialState
    },
  },
})

// Extract and export each action creator by name
export const { goToView, openDialog, closeDialog, reset } = story.actions

export default story.reducer
