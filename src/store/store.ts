import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import logger from 'redux-logger'

export const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV !== 'production') {
      return getDefaultMiddleware().concat(logger)
    } else {
      return getDefaultMiddleware()
    }
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
