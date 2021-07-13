import useFormContext from 'components/MuralForm/hooks/useFormContext'
import React from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { goToView, NavigationState, openDialog } from 'store/slices/navigation'

interface GoToProps {
  view: NavigationState['view']
  force?: boolean
}

export default function useRouter() {
  const dispatch = useAppDispatch()
  const currentView = useAppSelector((state) => state.navigation.view)
  const { formState } = useFormContext()
  const goTo = React.useCallback(
    ({
      view,
      // force is needed just after saving, because for whaterver reason, isDirty is still true
      force = false,
    }: GoToProps) => {
      if (force) {
        return dispatch(goToView(view))
      }
      if (formState.isDirty) {
        dispatch(
          openDialog({
            name: 'UnsavedChangesBeforeViewChange',
            props: { view },
          })
        )
      } else {
        dispatch(goToView(view))
      }
    },
    [dispatch, formState]
  )

  return {
    goTo,
    currentView,
  }
}
