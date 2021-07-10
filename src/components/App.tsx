import { Box } from '@material-ui/core'
import SecondPanel from 'components/SecondPanel'
import MuralAppBar from 'components/AppBar'
import MainPanel from 'components/MainPanel'
import { FormProvider } from 'react-hook-form'
import useForm from 'components/MuralForm/useForm'
import { DevTool } from '@hookform/devtools'

const APPBAR_HEIGHT = 64

function App() {
  const form = useForm()

  return (
    <div>
      <FormProvider {...form}>
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
      {/* for debugging purpose */}
      <DevTool control={form.control} placement="bottom-left" />
    </div>
  )
}

export default App
