import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface NavigationState {
  view: {
    name: 'metadata' | 'item'
    args?: any
  } | null
}

// Define the initial state using that type
const initialState: NavigationState = {
  view: null,
}

export const story = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<NavigationState['view']>) => {
      state.view = action.payload
    },
    reset: () => {
      return initialState
    },
  },
})

export const { setView, reset } = story.actions

export default story.reducer
