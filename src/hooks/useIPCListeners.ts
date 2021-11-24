import { useEffect } from 'react'
import { useAppDispatch } from 'store/hooks'
import { saveForm } from 'store/slices/story'
import useSaveAs from './useSaveAs'
import useFormContext from 'hooks/useFormContext'

export default function useIPCListeners() {
  const saveAs = useSaveAs()
  const dispatch = useAppDispatch()
  const {
    save,
    formState: { isDirty },
  } = useFormContext()

  // save as
  useEffect(() => {
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
  useEffect(() => {
    window.electron.onOpenFile((event: any, state: any) => {
      dispatch(saveForm(state.story))
    })
  }, [dispatch])

  useEffect(() => {
    window.electron.onSave(save)
  }, [save])

  useEffect(() => {
    window.electron.toggleSave(isDirty)
  }, [isDirty])

  useEffect(() => {
    window.electron.onExport(() => window.electron.exportAsZip())
  }, [])
}
