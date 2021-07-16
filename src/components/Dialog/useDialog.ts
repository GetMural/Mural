import React from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { closeDialog } from 'store/slices/navigation'

export default function useDialog() {
  const dispatch = useAppDispatch()
  const dialogState = useAppSelector((state) => state.navigation.dialog)

  const onDissmiss = React.useCallback(() => {
    dispatch(closeDialog())
  }, [dispatch])

  const onSubmit = React.useCallback(
    (payload?: any) => {
      // check if payload is an event. If so, replace event with `true`
      if (payload && payload.target) {
        payload = true
      }
      dispatch(closeDialog(payload === undefined ? true : payload))
    },
    [dispatch]
  )

  return { onSubmit, onDissmiss, dialogState }
}
