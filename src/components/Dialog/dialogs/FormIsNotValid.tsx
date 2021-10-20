import {
  DialogTitle,
  Dialog as MuiDialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material'
import { useAppDispatch } from 'store/hooks'
import { closeDialog } from 'store/slices/navigation'

interface Props {
  open: boolean
}

export default function UnsavedChanges({ open }: Props) {
  const dispatch = useAppDispatch()

  function dissmiss() {
    dispatch(closeDialog())
  }

  return (
    <MuiDialog
      open={open}
      keepMounted={false}
      onClose={dissmiss}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        There are errors in the form
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Please fix them
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={dissmiss}>Ok</Button>
      </DialogActions>
    </MuiDialog>
  )
}
