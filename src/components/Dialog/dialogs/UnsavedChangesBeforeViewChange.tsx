import {
  DialogTitle,
  Dialog as MuiDialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core'
import useFormContext from 'components/MuralForm/hooks/useFormContext'
import useRouter from 'hooks/useRouter'
import { useAppDispatch } from 'store/hooks'
import { closeDialog, NavigationState } from 'store/slices/navigation'

interface Props {
  open: boolean
  goToView: NavigationState['view']
}

export default function UnsavedChangesBeforeViewChange({
  open,
  goToView,
}: Props) {
  const dispatch = useAppDispatch()
  const { save, resetFormWithCurrentState } = useFormContext()
  const { goTo } = useRouter()
  function close() {
    dispatch(closeDialog())
  }

  return (
    <MuiDialog
      open={open}
      keepMounted={false}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Unsaved changes</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you want to save your changes before you leave?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            resetFormWithCurrentState()
            goTo({
              view: goToView,
              force: true,
            })
            close()
          }}
        >
          Ignore changes
        </Button>
        <Button onClick={close}>Cancel</Button>
        <Button
          onClick={async () => {
            await save()
            goTo({
              view: goToView,
              force: true,
            })
            close()
          }}
          color="primary"
          autoFocus
        >
          Save
        </Button>
      </DialogActions>
    </MuiDialog>
  )
}
