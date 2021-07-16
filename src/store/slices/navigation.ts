import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DialogNames } from 'components/Dialog'
import { AppThunk } from 'store/store'
import { Items } from './story'

type View =
  | {
      name: 'metadata'
    }
  | { name: 'item'; args: { item: Items } }
  | null

export interface NavigationState {
  view: View
  dialog: {
    name: DialogNames
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
    closeDialog: {
      reducer: (state, action: PayloadAction<any>) => {
        // NOTE: side effect. Not good
        // inform caller the dialog has been closed. undefined means dissmissed.
        if (state.dialog?.name) {
          let promise = dialogPromises[state.dialog.name]
          if (promise) {
            promise.resolve(action.payload)
          }
        }
        // reset dialog state (close)
        state.dialog = { ...initialState }.dialog
      },
      prepare: (returnValue?: any) => {
        return {
          payload: returnValue,
        }
      },
    },
    reset: () => {
      return initialState
    },
  },
})

export const openDialogAndWait =
  (dialog: NavigationState['dialog']): AppThunk<Promise<any>> =>
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
