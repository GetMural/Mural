import {
  DialogTitle,
  Dialog as MuiDialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core'
import { useAppDispatch } from 'store/hooks'
import { closeDialog } from 'store/slices/navigation'

interface Props {
  open: boolean
}

export default function UnsavedChanges({ open }: Props) {
  const dispatch = useAppDispatch()
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
      <DialogTitle id="alert-dialog-title">
        There are errors in the form
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Please fix the errors in the form
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => close()}>Ok</Button>
      </DialogActions>
    </MuiDialog>
  )
}
