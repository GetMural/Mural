import { Button, Box, Typography } from '@material-ui/core'
import StoryMetadataForm from 'components/StoryMetadataForm'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setView } from 'store/slices/navigation'
import BlockItemForm from 'components/BlockItemForm'

export default function SecondPanel() {
  const currentView = useAppSelector((state) => state.navigation.view?.name)
  const dispatch = useAppDispatch()
  const ComponentView = currentView
    ? {
        metadata: StoryMetadataForm,
        item: BlockItemForm,
      }[currentView]
    : EmptyView

  return (
    <div>
      {currentView && (
        <Button onClick={() => dispatch(setView(null))}>Back</Button>
      )}
      <ComponentView />
    </div>
  )
}

function EmptyView() {
  return (
    <Box pt={18} textAlign="center">
      <Typography color="textSecondary" style={{ fontSize: 24 }}>
        Add Content Block to Get Started
      </Typography>
    </Box>
  )
}
