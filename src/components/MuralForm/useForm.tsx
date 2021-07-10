import React from 'react'
import { useAppSelector } from 'store/hooks'
import { StoryState } from 'store/slices/story'
import { useForm as useReactForm } from 'react-hook-form'

export default function useForm() {
  /**
   * Instanciate a react form form instance that will be put in the FormContext
   * You should not need to use this hook somewhere else.
   *
   * It resets the form whenever the form is submitted
   */

  const story = useAppSelector((state) => state.story)
  const { reset, ...other } = useReactForm<StoryState>({
    defaultValues: story,
    mode: 'onChange',
  })

  React.useEffect(() => {
    reset(story)
  }, [story, reset])

  return { reset, ...other }
}
