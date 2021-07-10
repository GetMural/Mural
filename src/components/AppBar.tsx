import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/SaveSharp'
import BuildIcon from '@material-ui/icons/Public'
import NewIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import HelpIcon from '@material-ui/icons/Help'
import { useAppDispatch } from 'store/hooks'
import { reset, saveForm, StoryState } from 'store/slices/story'
import { useFormContext } from 'react-hook-form'

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
    formState: { isDirty, isValid },
  } = useFormContext<StoryState>()

  const { handleSubmit } = useFormContext()

  function onSubmit(data: StoryState) {
    dispatch(saveForm(data))
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.actions}>
            <Button
              startIcon={<SaveIcon />}
              color="inherit"
              onClick={handleSubmit(onSubmit)}
              disabled={!isDirty || !isValid}
            >
              Save
            </Button>
            <Button disabled startIcon={<BuildIcon />} color="inherit">
              Export
            </Button>
            <Button
              disabled
              startIcon={<NewIcon />}
              color="inherit"
              onClick={() => {
                dispatch(reset())
              }}
            >
              New
            </Button>
            <Button disabled startIcon={<DeleteIcon />} color="inherit">
              Delete
            </Button>
            <Button disabled startIcon={<HelpIcon />} color="inherit">
              Help
            </Button>
          </div>
          <Typography variant="h6" className={classes.title}>
            Mural
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
