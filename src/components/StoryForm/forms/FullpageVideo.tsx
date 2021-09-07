import { Box, Divider } from '@material-ui/core'
import Input from 'components/StoryForm/Input'
import Checkbox from '../Checkbox'
import Image from '../Image'
import Video from '../Video'
import Wysiwyg from '../Wysiwyg'

interface Props {
  itemIndex: number
}

export default function FullpageVideo({ itemIndex }: Props) {
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
          key={`items.${itemIndex}.loopVideo`}
          name={`items.${itemIndex}.loopVideo` as const}
          label="Loop Video"
        />
      </Box>
      <Divider light />
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
          key={`items.${itemIndex}.text`}
          name={`items.${itemIndex}.text` as const}
          label="Text"
          placeholder="Your text here"
        />
      </Box>
      <Box my={4}>
        <Image
          key={`items.${itemIndex}.representativeImage`}
          name={`items.${itemIndex}.representativeImage` as const}
          label="Representative Image"
        />
      </Box>
      <Box my={4}>
        <Input
          key={`items.${itemIndex}.imageAltText`}
          name={`items.${itemIndex}.imageAltText` as const}
          label="Image Alt Text"
        />
      </Box>
    </>
  )
}
