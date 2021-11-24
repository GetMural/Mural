import { Theme } from '@mui/material/styles'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import SaveIcon from '@mui/icons-material/SaveSharp'
import BuildIcon from '@mui/icons-material/Public'
import NewIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import HelpIcon from '@mui/icons-material/Help'
import PaymentIcon from '@mui/icons-material/MonetizationOn'
import {
  AppBar,
  Toolbar,
  Button as MuiButton,
  Typography,
  Tooltip,
  ButtonProps,
  Box,
} from '@mui/material'
import { useAppDispatch } from 'store/hooks'
import useFormContext from 'hooks/useFormContext'
import { openDialog } from 'store/slices/navigation'
import useIPCListeners from 'hooks/useIPCListeners'

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
  } = useFormContext()
  useIPCListeners()

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
            <Button
              startIcon={<BuildIcon />}
              onClick={() => {
                window.electron.exportAsZip()
              }}
            >
              Export
            </Button>
            <Button
              startIcon={<NewIcon />}
              onClick={() => {
                dispatch(
                  openDialog({
                    name: 'confirmReset',
                  })
                )
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
