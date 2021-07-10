import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/SaveSharp'
import BuildIcon from '@material-ui/icons/Public'
import NewIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import HelpIcon from '@material-ui/icons/Help'
import { useFormContext } from 'react-hook-form'
import {
  AppBar,
  Toolbar,
  Button as MuiButton,
  Typography,
  Tooltip,
  ButtonProps,
} from '@material-ui/core'
import { reset, saveForm, StoryState } from 'store/slices/story'
import { useAppDispatch } from 'store/hooks'

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
      textAlign: 'right',
      flexGrow: 1,
    },
  })
)

export default function MuralAppBar() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const {
    handleSubmit,
    formState: { isDirty },
  } = useFormContext<StoryState>()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.actions}>
            <Button
              startIcon={<SaveIcon />}
              onClick={handleSubmit((data) => dispatch(saveForm(data)))}
              variant="contained"
              color="secondary"
              disabled={!isDirty}
            >
              Save
            </Button>
            <ComingSoonButton startIcon={<BuildIcon />}>
              Export
            </ComingSoonButton>
            <Button startIcon={<NewIcon />} onClick={() => dispatch(reset())}>
              New
            </Button>
            <ComingSoonButton startIcon={<DeleteIcon />}>
              Delete
            </ComingSoonButton>
            <ComingSoonButton startIcon={<HelpIcon />}>Help</ComingSoonButton>
          </div>
          <Typography variant="h6" className={classes.title}>
            Mural
          </Typography>
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
