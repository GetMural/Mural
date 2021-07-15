import React from 'react'
import { useAppDispatch } from 'store/hooks'
import { openDialogAndWait } from 'store/slices/navigation'
import useFormContext from 'hooks/useFormContext'

export default function useAskToSaveChanges() {
  const dispatch = useAppDispatch()
  const {
    formState: { isDirty, isValid },
  } = useFormContext()

  const askToSaveChanges = React.useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      // TODO: remember why?
      if (!isValid) {
        return reject(
          dispatch(
            openDialogAndWait({
              name: 'FormIsNotValid',
            })
          )
        )
      } else if (isDirty) {
        return resolve(
          dispatch(
            openDialogAndWait({
              name: 'UnsavedChanges',
            })
          )
        )
      } else {
        resolve()
      }
    })
  }, [isDirty, isValid, dispatch])

  return askToSaveChanges
}
