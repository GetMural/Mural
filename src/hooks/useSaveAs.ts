import React from 'react'
import { useAppSelector } from 'store/hooks'
import packageJson from '../../package.json'

export default function useSaveAs() {
  const story = useAppSelector((state) => state.story)
  const saveAs = React.useCallback(() => {
    window.electron.saveAs({
      version: packageJson.version,
      story,
    })
  }, [story])
  return saveAs
}
