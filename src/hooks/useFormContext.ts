import React from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { saveForm, StoryState } from 'store/slices/story'
import { useFormContext as useReactFormContext } from 'react-hook-form'
import { cloneDeep } from 'lodash'

export default function useFormContext() {
  const { handleSubmit, formState, control, reset, trigger, watch, setValue } =
    useReactFormContext<StoryState>()
  const dispatch = useAppDispatch()
  const story = useAppSelector((state) => state.story)

  const resetFormWithCurrentState = React.useCallback(() => {
    reset(cloneDeep(story))
  }, [reset, story])

  const save = React.useCallback(async () => {
    await handleSubmit((data) => {
      dispatch(saveForm(cloneDeep(data)))
    })()
  }, [dispatch, handleSubmit])

  return {
    save,
    formState,
    control,
    resetFormWithCurrentState,
    trigger,
    watch,
    setValue,
  }
}
