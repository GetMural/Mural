import { Box, Button } from '@material-ui/core'
import { useAppDispatch } from 'store/hooks'
import { setView } from 'store/slices/navigation'
import { addItem } from 'store/slices/story'
import BlockItems from 'components/BlockItems'

export default function MainPanel() {
  const dispatch = useAppDispatch()
  return (
    <Box>
      <Box textAlign="right">
        <Button
          variant="contained"
          onClick={() => dispatch(setView({ name: 'metadata' }))}
        >
          Metadata
        </Button>
      </Box>
      <Button
        variant="contained"
        onClick={() => dispatch(addItem('backgroundVideo'))}
      >
        Background Video
      </Button>
      <BlockItems />
    </Box>
  )
}
