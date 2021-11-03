import React from 'react'
import { useAppDispatch } from 'store/hooks'
import { saveForm } from 'store/slices/story'
import useSaveAs from './useSaveAs'

export default function useIPCListeners() {
  const saveAs = useSaveAs()
  const dispatch = useAppDispatch()

  // save as
  React.useEffect(() => {
    window.electron.onSaveAsMenuClick(
      () => {
        saveAs()
      },
      function onSaved(event: any, args: any) {
        console.log('completed', args)
      }
    )
  }, [saveAs])

  // open file
  React.useEffect(() => {
    window.electron.onOpenFile((event: any, state: any) => {
      dispatch(saveForm(state.story))
    })
  }, [dispatch])
}
