import React from 'react'
import { useAppSelector } from 'store/hooks'
import { RootState } from 'store/store'

const render = (state: RootState) => {
  window.electron.renderPreview({
    // @ts-ignore
    meta: {
      title: state.story.metadata.title,
    },
  })
}

export default function usePreview() {
  const state = useAppSelector((state) => state)

  React.useEffect(() => {
    render(state)
  }, [state])

  return {
    render,
  }
}
