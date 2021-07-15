import {
  DialogTitle,
  Dialog as MuiDialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core'
import useFormContext from 'hooks/useFormContext'
import { useAppDispatch } from 'store/hooks'
import { closeDialog } from 'store/slices/navigation'

interface Props {
  open: boolean
}

export default function UnsavedChanges({ open }: Props) {
  const dispatch = useAppDispatch()
  const { save, resetFormWithCurrentState } = useFormContext()
  function close(shouldReject?: 'reject') {
    dispatch(closeDialog(shouldReject))
  }

  return (
    <MuiDialog
      open={open}
      keepMounted={false}
      onClose={() => close('reject')}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Unsaved changes</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          First you need to save your changes. Do you want to save?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            resetFormWithCurrentState()
            close()
          }}
        >
          Ignore changes and proceed
        </Button>
        <Button onClick={() => close('reject')}>Cancel</Button>
        <Button
          onClick={async () => {
            await save()
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
