import React from 'react'
import { Storyboard } from '../../electron/exportFrontend'
import useStoryStateMapping from './useStoryStateMapping'

const render = (state: Storyboard) => {
  window.electron.renderPreview(state)
}

export default function usePreview() {
  const mappedState = useStoryStateMapping()
  React.useEffect(() => {
    render(mappedState)
  }, [mappedState])
}
