import { Box, Divider } from '@mui/material'
import Input from 'components/StoryForm/Input'
import Checkbox from 'components/StoryForm/Checkbox'
import Audio from 'components/StoryForm/Audio'
import Image from 'components/StoryForm/Image'
import Wysiwyg from '../Wysiwyg'

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
        <Audio
          key={`items.${itemIndex}.audio`}
          name={`items.${itemIndex}.audio` as const}
          label="Audio"
        />
      </Box>
      <Box my={4}>
        <Checkbox
          key={`items.${itemIndex}.loop`}
          name={`items.${itemIndex}.loop` as const}
          label="Loop Audio"
        />
      </Box>
      <Box my={4}>
        <Checkbox
          key={`items.${itemIndex}.light`}
          name={`items.${itemIndex}.light` as const}
          label="Black text on white background"
        />
      </Box>
      <Divider light />
      <Box my={4}>
        <Input
          key={`items.${itemIndex}.title`}
          name={`items.${itemIndex}.title` as const}
          label="Title"
          placeholder="Your text here"
        />
      </Box>
      <Box my={4}>
        <Input
          key={`items.${itemIndex}.imageCaption`}
          name={`items.${itemIndex}.imageCaption` as const}
          label="Image Caption"
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
        <Input
          key={`items.${itemIndex}.altText`}
          name={`items.${itemIndex}.altText` as const}
          label="Image Alt Text"
        />
      </Box>
      <Box my={4}>
        <Wysiwyg
          key={`items.${itemIndex}.imageCredits`}
          name={`items.${itemIndex}.imageCredits` as const}
          label="Image Credits"
        />
      </Box>
      <Box my={4}>
        <Wysiwyg
          key={`items.${itemIndex}.audioCredits`}
          name={`items.${itemIndex}.audioCredits` as const}
          label="Audio Credits"
        />
      </Box>
    </>
  )
}
