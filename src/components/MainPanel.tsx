import { Box, Button } from '@material-ui/core'
import { useAppDispatch } from 'store/hooks'
import { addItem } from 'store/slices/story'
import BlockItems from 'components/BlockItems'
import useRouter from 'hooks/useRouter'

export default function MainPanel() {
  const dispatch = useAppDispatch()
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
