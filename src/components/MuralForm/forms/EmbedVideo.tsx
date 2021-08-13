import { Box } from '@material-ui/core'
import Input from 'components/MuralForm/Input'
import Checkbox from 'components/MuralForm/Checkbox'

interface Props {
  itemIndex: number
}

export default function EmbedVideo({ itemIndex }: Props) {
  return (
    <>
      <Box my={4}>
        <Input
          key={`items.${itemIndex}.link`}
          name={`items.${itemIndex}.link` as const}
          label="Embed Link"
          rules={{ required: true }}
          helperText="YouTube, Vimeo, DailyMotion link"
        />
      </Box>
      <Box my={4}>
        <Checkbox
          key={`items.${itemIndex}.showControls`}
          name={`items.${itemIndex}.showControls` as const}
          label="Show controls"
        />
      </Box>
    </>
  )
}
