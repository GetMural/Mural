import { Box, Divider } from '@mui/material'
import Input from 'components/StoryForm/Input'
import Checkbox from 'components/StoryForm/Checkbox'
import Audio from 'components/StoryForm/Audio'
import Image from 'components/StoryForm/Image'
import Wysiwyg from 'components/StoryForm/Wysiwyg'

interface Props {
  itemIndex: number
}

export default function ImageAudio({ itemIndex }: Props) {
  return (
    <>
      <Box my={4}>
        <Image
          key={`items.${itemIndex}.image`}
          name={`items.${itemIndex}.image`}
          label="Image"
        />
      </Box>
      <Box my={4}>
        <Checkbox
          key={`items.${itemIndex}.fullPage`}
          name={`items.${itemIndex}.fullPage` as const}
          label="Show full page"
        />
      </Box>
      <Box my={4}>
        <Input
          key={`items.${itemIndex}.altText`}
          name={`items.${itemIndex}.altText` as const}
          label="Image Alt Text"
        />
      </Box>
      <Divider light />
      <Box my={4}>
        <Audio
          key={`items.${itemIndex}.audio`}
          name={`items.${itemIndex}.audio` as const}
          label="Audio"
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
          key={`items.${itemIndex}.subtitle`}
          name={`items.${itemIndex}.subtitle` as const}
          label="Subtitle"
          placeholder="Your text here"
        />
      </Box>
    </>
  )
}
