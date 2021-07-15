import { Box } from '@material-ui/core'
import Input from 'components/MuralForm/Input'

interface Props {
  itemIndex: number
}

export default function BackgroundVideo({ itemIndex }: Props) {
  return (
    <Box my={4}>
      <Input
        type="hidden"
        key={`items.${itemIndex}.type`}
        name={`items.${itemIndex}.type` as const}
      />
      <Input
        key={`items.${itemIndex}.title`}
        name={`items.${itemIndex}.title` as const}
        label="Title"
        rules={{ required: true }}
        autoFocus
      />
    </Box>
  )
}
