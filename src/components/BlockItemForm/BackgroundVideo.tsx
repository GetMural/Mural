import { Box } from '@material-ui/core'
import Input from 'components/MuralForm/Input'
import { useAppSelector } from 'store/hooks'

export default function BackgroundVideo() {
  const itemIndex = useAppSelector(
    (state) => state.navigation.view?.args?.index
  )
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
      />
    </Box>
  )
}
