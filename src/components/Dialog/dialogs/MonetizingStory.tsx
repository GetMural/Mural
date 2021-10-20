import {
  DialogTitle,
  Dialog as MuiDialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
} from '@mui/material'
import React from 'react'
import { useAppDispatch } from 'store/hooks'
import { setDontAskConfirmationForMonetisation } from 'store/slices/navigation'
import { DialogProps } from '../index'

export default function MonetizingStory({
  open,
  onSubmit,
  onDissmiss,
}: DialogProps) {
  const [doNotShowAgain, setDoNotShowAgain] = React.useState(false)
  const dispatch = useAppDispatch()
  return (
    <MuiDialog
      open={open}
      keepMounted={false}
      onClose={onDissmiss}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Your Story will be monetized
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          If you move content blocks below the monetization divider, they will
          not be visible to non-paying visitors.
        </DialogContentText>
        <FormControl>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => setDoNotShowAgain(e.target.checked)}
                checked={doNotShowAgain}
              />
            }
            label={'Do not show this message again'}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDissmiss}>Cancel</Button>
        <Button
          onClick={() => {
            // save "do not show again" value
            if (doNotShowAgain) {
              dispatch(setDontAskConfirmationForMonetisation(true))
            }
            onSubmit()
          }}
        >
          Ok
        </Button>
      </DialogActions>
    </MuiDialog>
  )
}
