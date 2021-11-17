import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SettingsState {
  payment: {
    enabled: boolean
    pointers: {
      name: string
      pointer: string
      share: number
    }[]
    accessCode?: string
    rot: number
  }
}

// Define the initial state using that type
const initialState: SettingsState = {
  payment: {
    enabled: false,
    pointers: [
      {
        name: 'Me',
        pointer: '',
        share: 100,
      },
    ],
    accessCode: '',
    rot: 0,
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
