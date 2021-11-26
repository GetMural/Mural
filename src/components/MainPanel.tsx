import { Box, Button } from '@mui/material'
import BlockItems from 'components/BlockItems'
import useRouter from 'hooks/useRouter'
import BlockItemsSelector from './BlockItemsSelector'

export default function MainPanel() {
  const { goTo } = useRouter()

  return (
    <Box>
      <Box textAlign="right">
        <Button
          variant="contained"
          onClick={() => goTo({ view: { name: 'metadata' } })}
        >
          Metadata
        </Button>
      </Box>
      <Box py={6}>
        <BlockItemsSelector />
      </Box>
      <BlockItems />
    </Box>
  )
}
