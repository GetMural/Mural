import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'store/store'

type View = {
  name: 'metadata' | 'item'
  args?: any
} | null

// Define a type for the slice state
export interface NavigationState {
  view: View
  dialog: {
    name: 'UnsavedChanges' | 'FormIsNotValid'
    props?: any
  } | null
}

// Define the initial state using that type
const initialState: NavigationState = {
  view: null,
  dialog: null,
}

// NOTE: it's a hack that makes our reducer unpure.
// this should be done in a middleware
const dialogPromises: {
  [key: string]: any
} = {}

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
    closeDialog: (state, action: PayloadAction<'reject' | undefined>) => {
      // inform caller the dialog has been closed
      if (state.dialog?.name) {
        let promise = dialogPromises[state.dialog.name]
        if (promise) {
          if (action.payload === 'reject') {
            promise.reject()
          } else {
            promise.resolve()
          }
        }
      }
      // reset dialog state (close)
      state.dialog = { ...initialState }.dialog
    },
    reset: () => {
      return initialState
    },
  },
})

export const openDialogAndWait =
  (dialog: NavigationState['dialog']): AppThunk<Promise<void>> =>
  (dispatch) => {
    dispatch(openDialog(dialog))
    return new Promise((resolve, reject) => {
      if (dialog?.name) {
        dialogPromises[dialog.name] = { resolve, reject }
      }
    })
  }

// Extract and export each action creator by name
export const { goToView, openDialog, closeDialog, reset } = story.actions

export default story.reducer
