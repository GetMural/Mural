import { Box, Divider } from '@material-ui/core'
import Input from 'components/StoryForm/Input'
import Image from '../Image'
import Wysiwyg from '../Wysiwyg'

interface Props {
  itemIndex: number
}

export default function ParallaxImage({ itemIndex }: Props) {
  return (
    <>
      <Box my={4}>
        <Image
          key={`items.${itemIndex}.image`}
          name={`items.${itemIndex}.image` as const}
          label="Image"
        />
      </Box>
      <Box my={4}>
        <Input
          key={`items.${itemIndex}.altText`}
          name={`items.${itemIndex}.altText` as const}
          label="Image Alt Text"
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
