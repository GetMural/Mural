import { Box, Button } from '@material-ui/core'
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
      <Box py={4}>
        <BlockItemsSelector />
      </Box>
      <BlockItems />
    </Box>
  )
}
