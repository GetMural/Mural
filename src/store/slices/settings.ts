import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SettingsState {
  payment: {
    pointers: {
      name: string
      pointer: string
      share: number
    }[]
  }
}

// Define the initial state using that type
const initialState: SettingsState = {
  payment: {
    pointers: [
      {
        name: 'Me',
        pointer: '',
        share: 100,
      },
    ],
  },
}

export const story = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setPaymentSettings: (
      state,
      action: PayloadAction<SettingsState['payment']>
    ) => {
      state.payment = action.payload
    },
  },
})

export const { setPaymentSettings } = story.actions

export default story.reducer
