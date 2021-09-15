import { Box } from '@material-ui/core'
import Input from 'components/StoryForm/Input'
import Checkbox from '../Checkbox'
import Video from '../Video'
import Wysiwyg from '../Wysiwyg'

interface Props {
  itemIndex: number
}

export default function BackgroundVideo({ itemIndex }: Props) {
  return (
    <>
      <Box my={4}>
        <Video
          key={`items.${itemIndex}.video`}
          name={`items.${itemIndex}.video` as const}
          label="Video"
        />
      </Box>
      <Box my={4}>
        <Checkbox
          key={`items.${itemIndex}.fullPage`}
          name={`items.${itemIndex}.fullPage` as const}
          label="Full Page"
        />
      </Box>
      <Box my={4}>
        <Input
          key={`items.${itemIndex}.navigationTitle`}
          name={`items.${itemIndex}.navigationTitle` as const}
          label="Navigation Title"
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
    </>
  )
}