import React from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { goToView, NavigationState } from 'store/slices/navigation'
import useAskToSaveChanges from './useAskToSaveChanges'

interface GoToProps {
  view: NavigationState['view']
  force?: boolean
}

export default function useRouter() {
  const dispatch = useAppDispatch()
  const currentView = useAppSelector((state) => state.navigation.view)
  const askToSaveChanges = useAskToSaveChanges()
  const goTo = React.useCallback(
    ({
      view,
      // force is needed just after saving, because for whaterver reason, isDirty is still true
      force = false,
    }: GoToProps) => {
      if (force) {
        return dispatch(goToView(view))
      }
      askToSaveChanges().then((res) => {
        if (res) {
          dispatch(goToView(view))
        }
      })
    },
    [dispatch, askToSaveChanges]
  )

  return {
    goTo,
    currentView,
  }
}
