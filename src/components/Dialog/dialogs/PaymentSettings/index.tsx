import { Dialog as MuiDialog } from '@material-ui/core'
import { DialogProps } from 'components/Dialog'
import DialogContent from './DialogContent'

export default function PaymentSettings({
  open,
  onSubmit,
  onDissmiss,
}: DialogProps) {
  return (
    <MuiDialog
      open={open}
      keepMounted={false}
      onClose={onDissmiss}
      fullWidth
      maxWidth="md"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent onDissmiss={onDissmiss} onSubmit={onSubmit} />
    </MuiDialog>
  )
}
