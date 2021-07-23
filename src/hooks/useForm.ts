import React from 'react'
import { useAppSelector } from 'store/hooks'
import { StoryState } from 'store/slices/story'
import { useForm as useReactForm } from 'react-hook-form'
import isEqual from 'lodash/isEqual'
export default function useForm() {
  /**
   * Instanciate a react form form instance that will be put in the FormContext
   * You should not need to use this hook somewhere else but useFormContext
   *
   * It resets the form whenever the story state has changed (form is submitted)
   */

  const story = useAppSelector((state) => state.story)

  const forms = useReactForm<StoryState>({
    defaultValues: story,
    // mode: 'onChange',
  })

  const previousStoryRef = React.useRef<StoryState>()

  React.useEffect(() => {
    if (!isEqual(story, previousStoryRef.current)) {
      forms.reset({ ...story })
      previousStoryRef.current = story
    }
  }, [story, forms])

  return { ...forms }
}
