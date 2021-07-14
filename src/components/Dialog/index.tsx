import { useAppSelector } from 'store/hooks'
import UnsavedChangesBeforeViewChange from './dialogs/UnsavedChangesBeforeViewChange'
import UnsavedChanges from './dialogs/UnsavedChanges'
import FormIsNotValid from './dialogs/FormIsNotValid'

export default function AlertDialog() {
  const dialogState = useAppSelector((state) => state.navigation.dialog)
  return (
    <>
      <UnsavedChangesBeforeViewChange
        open={dialogState?.name === 'UnsavedChangesBeforeViewChange'}
        goToView={dialogState?.props?.view || null}
      />
      <UnsavedChanges open={dialogState?.name === 'UnsavedChanges'} />
      <FormIsNotValid open={dialogState?.name === 'FormIsNotValid'} />
    </>
  )
}
