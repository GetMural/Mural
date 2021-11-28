import { Theme } from '@mui/material/styles'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import SaveIcon from '@mui/icons-material/SaveSharp'
import BuildIcon from '@mui/icons-material/Public'
import NewIcon from '@mui/icons-material/Add'
import PaymentIcon from '@mui/icons-material/MonetizationOn'
import PreviewIcon from '@mui/icons-material/PreviewSharp'
import {
  AppBar,
  Toolbar,
  Button as MuiButton,
  Typography,
  ButtonProps,
  Box,
} from '@mui/material'
import { useAppDispatch } from 'store/hooks'
import useFormContext from 'hooks/useFormContext'
import { openDialog } from 'store/slices/navigation'
import useIPCListeners from 'hooks/useIPCListeners'
import logo from 'logo.svg'

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
          <Box display="flex" alignItems="center" mr={4}>
            <img src={logo} width={48} alt="Mural Logo" />
            <Typography variant="h6">Mural</Typography>
          </Box>
          <div className={classes.actions}>
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
            <Button
              startIcon={<PaymentIcon />}
              onClick={() => {
                dispatch(openDialog({ name: 'PaymentSettings' }))
              }}
            >
              Payment
            </Button>
            <Button
              startIcon={<PreviewIcon />}
              onClick={() => {
                window.electron.openPreview()
              }}
            >
              Preview
            </Button>
          </div>
          <Box flexGrow={1} textAlign="right">
            <Button
              startIcon={<SaveIcon />}
              onClick={save}
              variant="contained"
              color="secondary"
              disabled={!isDirty}
            >
              Save
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
