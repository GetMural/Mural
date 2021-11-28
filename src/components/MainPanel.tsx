import { Box, Button, Typography } from '@mui/material'
import BlockItems from 'components/BlockItems'
import useRouter from 'hooks/useRouter'
import { useAppSelector } from 'store/hooks'
import BlockItemsSelector from './BlockItemsSelector'

export default function MainPanel() {
  const { goTo } = useRouter()
  const title = useAppSelector((state) => state.story.metadata.title)
  return (
    <Box>
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h1">{title || 'No Name'}</Typography>
        </Box>
        <div>
          <Button
            variant="contained"
            onClick={() => goTo({ view: { name: 'metadata' } })}
          >
            Metadata
          </Button>
        </div>
      </Box>
      <Box py={6}>
        <BlockItemsSelector />
      </Box>
      <BlockItems />
    </Box>
  )
}
