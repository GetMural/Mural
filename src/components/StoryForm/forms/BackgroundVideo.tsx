import { Box, Divider } from '@mui/material'
import Input from 'components/StoryForm/Input'
import Checkbox from '../Checkbox'
import Video from '../Video'
import Image from '../Image'
import Wysiwyg from '../Wysiwyg'
import Color from '../Color'
import OffsetPortraitVideo from '../OffsetPortraitVideo'

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
          label="Full Page Layout (Leave blank for smaller title and text in upper left)"
        />
      </Box>
      <Divider light />
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
          key={`items.${itemIndex}.text`}
          name={`items.${itemIndex}.text` as const}
          label="Text"
          placeholder="Your text here"
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
        <Image
          key={`items.${itemIndex}.posterImage`}
          name={`items.${itemIndex}.posterImage` as const}
          label="Backup Image"
        />
      </Box>
      <Box my={4}>
        <OffsetPortraitVideo
          key={`items.${itemIndex}.offsetPortraitVideo`}
          name={`items.${itemIndex}.offsetPortraitVideo` as const}
          label="Offset Portrait Video"
        />
      </Box>
      <Box my={4}>
        <Color
          key={`items.${itemIndex}.backgroundTextColor`}
          name={`items.${itemIndex}.backgroundTextColor` as const}
          label="Background Text Color"
        />
      </Box>
    </>
  )
}
