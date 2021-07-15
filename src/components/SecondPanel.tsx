import { Button, Box, Typography, Slide } from '@material-ui/core'
import StoryMetadata from 'components/MuralForm/forms/StoryMetadata'
import { useAppSelector } from 'store/hooks'
import BackgroundVideo from 'components/MuralForm/forms/BackgroundVideo'
import useRouter from 'hooks/useRouter'
import { selectedItemIndexSelector } from 'store/slices/story'

export default function SecondPanel() {
  const currentView = useAppSelector((state) => state.navigation.view)
  const { goTo } = useRouter()
  const selectedItemIndex = useAppSelector(selectedItemIndexSelector)
  return (
    <div>
      {currentView && (
        <Button onClick={() => goTo({ view: null })}>Back</Button>
      )}
      <Slide
        direction="left"
        in={currentView?.name === 'metadata'}
        mountOnEnter
        unmountOnExit
      >
        <div>
          <StoryMetadata />
        </div>
      </Slide>
      <Slide
        direction="left"
        in={
          currentView?.name === 'item' &&
          currentView.args?.item.type === 'backgroundVideo'
        }
        mountOnEnter
        unmountOnExit
      >
        <div>
          {selectedItemIndex !== undefined && (
            <BackgroundVideo itemIndex={selectedItemIndex} />
          )}
        </div>
      </Slide>
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
