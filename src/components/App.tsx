import { Box } from '@material-ui/core'
import SecondPanel from 'components/SecondPanel'
import MuralAppBar from 'components/AppBar'
import MainPanel from 'components/MainPanel'
import { useForm, FormProvider } from 'react-hook-form'
import { StoryState } from 'store/slices/story'
import { useAppSelector } from 'store/hooks'

const APPBAR_HEIGHT = 64

function App() {
  const story = useAppSelector((state) => state.story)
  const methods = useForm<StoryState>({
    defaultValues: story,
    mode: 'onChange',
  })

  return (
    <div>
      <FormProvider {...methods}>
        <MuralAppBar />
        <Box display="flex">
          <Box
            flexBasis="0"
            flexGrow="1"
            minHeight={`calc(100vh - ${APPBAR_HEIGHT}px)`}
          >
            <Box p={4}>
              <MainPanel />
            </Box>
          </Box>
          <Box
            flexBasis="0"
            bgcolor="#fafafa"
            flexGrow="1"
            minHeight={`calc(100vh - ${APPBAR_HEIGHT}px)`}
          >
            <Box p={4}>
              <SecondPanel />
            </Box>
          </Box>
        </Box>
      </FormProvider>
    </div>
  )
}

export default App
