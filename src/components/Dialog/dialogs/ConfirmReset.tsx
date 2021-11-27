import {
  DialogTitle,
  Dialog as MuiDialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material'
import useFormContext from 'hooks/useFormContext'
import { useAppDispatch } from 'store/hooks'
import { closeDialog } from 'store/slices/navigation'
import { reset } from 'store/slices/story'
import { goToView } from 'store/slices/navigation'

interface Props {
  open: boolean
}

export default function ConfirmReset({ open }: Props) {
  const dispatch = useAppDispatch()
  const { resetFormWithCurrentState } = useFormContext()
  function submit(payload?: any) {
    dispatch(closeDialog(payload || true))
  }
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
      <DialogTitle id="alert-dialog-title">Warning</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <div>
            The current items in your story will be erased. Do you want to
            proceed?
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={dissmiss}>Cancel</Button>
        <Button
          color="primary"
          onClick={() => {
            dispatch(goToView(null))
            // has to happen when the form is closed
            setTimeout(() => {
              dispatch(reset())
              resetFormWithCurrentState()
              window.electron.resetStory()
              submit()
            }, 1000)
          }}
        >
          Continue
        </Button>
      </DialogActions>
    </MuiDialog>
  )
}
