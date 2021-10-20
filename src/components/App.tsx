import { Box } from '@mui/material'
import SecondPanel from 'components/SecondPanel'
import MuralAppBar from 'components/AppBar'
import MainPanel from 'components/MainPanel'
import { FormProvider } from 'react-hook-form'
import useForm from 'hooks/useForm'
import usePreview from 'hooks/usePreview'
import Dialog from 'components/Dialog'
import usePaymentSeparatorListener from 'hooks/usePaymentSeparatorListener'

const APPBAR_HEIGHT = 64

function App() {
  const form = useForm()
  usePaymentSeparatorListener()
  usePreview()
  return (
    <div>
      <FormProvider {...form}>
        <MuralAppBar />
        <Box display="flex">
          <Box
            flexBasis="0"
            flexGrow={1}
            bgcolor="white"
            minHeight={`calc(100vh - ${APPBAR_HEIGHT}px)`}
          >
            <Box p={4}>
              <MainPanel />
            </Box>
          </Box>
          <Box
            flexBasis="0"
            bgcolor="#fafafa"
            flexGrow={1}
            minHeight={`calc(100vh - ${APPBAR_HEIGHT}px)`}
          >
            <Box p={4}>
              <SecondPanel />
            </Box>
          </Box>
        </Box>
        <Dialog />
      </FormProvider>
    </div>
  )
}

export default App
