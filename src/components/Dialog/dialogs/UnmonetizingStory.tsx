import {
  DialogTitle,
  Dialog as MuiDialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core'
import { DialogProps } from '../index'

export default function UnmonetizingStory({
  open,
  onSubmit,
  onDissmiss,
}: DialogProps) {
  return (
    <MuiDialog
      open={open}
      keepMounted={false}
      onClose={onDissmiss}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Your Story will <b>not</b> be monetized
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          If you want to monetize your Story, click "Cancel".
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDissmiss}>Cancel</Button>
        <Button onClick={onSubmit}>Ok</Button>
      </DialogActions>
    </MuiDialog>
  )
}
