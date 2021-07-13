import { Button, Box, Typography } from '@material-ui/core'
import StoryMetadata from 'components/MuralForm/forms/StoryMetadata'
import { useAppSelector } from 'store/hooks'
import BackgroundVideo from 'components/MuralForm/forms/BackgroundVideo'
import useRouter from 'hooks/useRouter'

export default function SecondPanel() {
  const currentView = useAppSelector((state) => state.navigation.view)
  const { goTo } = useRouter()

  return (
    <div>
      {currentView && (
        <Button onClick={() => goTo({ view: null })}>Back</Button>
      )}
      {currentView?.name === 'metadata' && <StoryMetadata />}
      {currentView?.name === 'item' &&
        currentView.args?.item.type === 'backgroundVideo' && (
          <BackgroundVideo itemIndex={currentView.args.index} />
        )}
      {/* empty view */}
      {!currentView && <EmptyView />}
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
