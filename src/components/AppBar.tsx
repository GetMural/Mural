import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/SaveSharp'
import BuildIcon from '@material-ui/icons/Public'
import NewIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import HelpIcon from '@material-ui/icons/Help'
import PaymentIcon from '@material-ui/icons/MonetizationOn'
import {
  AppBar,
  Toolbar,
  Button as MuiButton,
  Typography,
  Tooltip,
  ButtonProps,
  Box,
} from '@material-ui/core'
import { reset } from 'store/slices/story'
import { useAppDispatch } from 'store/hooks'
import useFormContext from 'hooks/useFormContext'
import { goToView, openDialog } from 'store/slices/navigation'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: 'sticky',
      top: 0,
      zIndex: 2,
    },
    actions: {
      '&>*': {
        marginRight: theme.spacing(2),
      },
    },
    title: {
      textAlign: 'center',
      flexGrow: 1,
    },
  })
)

export default function MuralAppBar() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const {
    save,
    formState: { isDirty },
    resetFormWithCurrentState,
  } = useFormContext()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.actions}>
            <Button
              startIcon={<SaveIcon />}
              onClick={save}
              variant="contained"
              color="secondary"
              disabled={!isDirty}
            >
              Save
            </Button>
            <ComingSoonButton startIcon={<BuildIcon />}>
              Export
            </ComingSoonButton>
            <Button
              startIcon={<NewIcon />}
              onClick={() => {
                dispatch(goToView(null))
                // has to happen when the form is closed
                setTimeout(() => {
                  dispatch(reset())
                  resetFormWithCurrentState()
                }, 1000)
              }}
            >
              New
            </Button>
            <ComingSoonButton startIcon={<DeleteIcon />}>
              Delete
            </ComingSoonButton>
            <Button
              startIcon={<PaymentIcon />}
              onClick={() => {
                dispatch(openDialog({ name: 'PaymentSettings' }))
              }}
            >
              Payment
            </Button>
            <ComingSoonButton startIcon={<HelpIcon />}>Help</ComingSoonButton>
          </div>
          <Typography variant="h6" className={classes.title}>
            Mural
          </Typography>
          <Box>
            <Button
              onClick={() => {
                window.electron.openPreview()
              }}
            >
              Preview
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  )
}

function Button(props: ButtonProps) {
  return <MuiButton color="inherit" {...props} />
}

function ComingSoonButton(props: ButtonProps) {
  return (
    <Tooltip title="Coming soon" arrow>
      <span>
        <Button disabled {...props} />
      </span>
    </Tooltip>
  )
}
