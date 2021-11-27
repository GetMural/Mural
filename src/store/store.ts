import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { save, load } from 'redux-localstorage-simple'
import story from './slices/story'
import navigation from './slices/navigation'
import settings from './slices/settings'

export const store = configureStore({
  preloadedState: load(),
  reducer: {
    story,
    navigation,
    settings,
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware()
    if (process.env.NODE_ENV !== 'production') {
      middleware.push(logger)
    }
    middleware.push(save())
    return middleware
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
