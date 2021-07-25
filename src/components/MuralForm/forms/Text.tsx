import { Box } from '@material-ui/core'
import Input from 'components/MuralForm/Input'
import Wysiwyg from '../Wysiwyg'

interface Props {
  itemIndex: number
}

export default function Text({ itemIndex }: Props) {
  return (
    <>
      <Box my={4}>
        <Input
          key={`items.${itemIndex}.navigationTitle`}
          name={`items.${itemIndex}.navigationTitle` as const}
          label="Navigation Title"
          rules={{ required: true }}
          autoFocus
        />
      </Box>
      <Box my={4}>
        <Wysiwyg
          key={`items.${itemIndex}.title`}
          name={`items.${itemIndex}.title` as const}
          label="Title"
          placeholder="Your text here"
        />
      </Box>
      <Box my={4}>
        <Wysiwyg
          key={`items.${itemIndex}.subtitle`}
          name={`items.${itemIndex}.subtitle` as const}
          label="Subtitle"
          placeholder="Your text here"
        />
      </Box>
      <Box my={4}>
        <Wysiwyg
          key={`items.${itemIndex}.introduction`}
          name={`items.${itemIndex}.introduction` as const}
          label="Introduction"
          placeholder="Your text here"
        />
      </Box>
    </>
  )
}
