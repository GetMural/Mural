import React from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { saveForm, StoryState } from 'store/slices/story'
import { useFormContext as useReactFormContext } from 'react-hook-form'
import { store } from 'store/store'

export default function useFormContext() {
  const { handleSubmit, formState, control, reset } =
    useReactFormContext<StoryState>()
  const dispatch = useAppDispatch()
  const story = useAppSelector((state) => state.story)

  const resetFormWithCurrentState = React.useCallback(() => {
    reset({ ...story })
  }, [reset, story])

  const save = React.useCallback(async () => {
    await handleSubmit((data) => {
      dispatch(saveForm(data))
      reset({ ...store.getState().story })
    })()
  }, [dispatch, handleSubmit, reset])

  return { save, formState, control, resetFormWithCurrentState }
}
