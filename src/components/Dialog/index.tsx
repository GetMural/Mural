import { useAppSelector } from 'store/hooks'
import UnsavedChanges from './dialogs/UnsavedChanges'
import FormIsNotValid from './dialogs/FormIsNotValid'

export default function AlertDialog() {
  const dialogState = useAppSelector((state) => state.navigation.dialog)
  return (
    <>
      <UnsavedChanges open={dialogState?.name === 'UnsavedChanges'} />
      <FormIsNotValid open={dialogState?.name === 'FormIsNotValid'} />
    </>
  )
}
