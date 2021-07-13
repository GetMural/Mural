import { useAppSelector } from 'store/hooks'
import UnsavedChangesBeforeViewChange from './dialogs/UnsavedChangesBeforeViewChange'

export default function AlertDialog() {
  const dialogState = useAppSelector((state) => state.navigation.dialog)
  return (
    <>
      <UnsavedChangesBeforeViewChange
        open={dialogState?.name === 'UnsavedChangesBeforeViewChange'}
        goToView={dialogState?.props.view || null}
      />
    </>
  )
}
