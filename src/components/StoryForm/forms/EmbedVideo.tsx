import { Box } from '@material-ui/core'
import Input from 'components/StoryForm/Input'
import Checkbox from 'components/StoryForm/Checkbox'
import React from 'react'
import useFormContext from 'hooks/useFormContext'
import embedVideo from 'embed-video'

interface Props {
  itemIndex: number
}

export default function EmbedVideo({ itemIndex }: Props) {
  const { watch, setValue } = useFormContext()

  const embedLink = watch(`items.${itemIndex}.link`)
  const showControls = watch(`items.${itemIndex}.showControls`)
  const [embedCode, setEmbedCode] = React.useState<string>()
  const [error, setError] = React.useState<string>()

  React.useEffect(() => {
    if (embedLink) {
      try {
        const embedCode = embedVideo(embedLink, {
          query: { controls: showControls ? 1 : 0, autoplay: 0 },
          attr: { allow: 'modestbranding; nobranding' },
        })
        setEmbedCode(embedCode)
        setValue(`items.${itemIndex}.embed`, {
          ...embedVideo.info(embedLink),
          embed: embedCode,
        })
      } catch (error) {
        setEmbedCode(undefined)
        setValue(`items.${itemIndex}.embed`, undefined)
        setError('This url failed to load.')
      }
    } else {
      setEmbedCode(undefined)
      setValue(`items.${itemIndex}.embed`, undefined)
    }
  }, [embedLink, itemIndex, setValue, showControls])

  return (
    <>
      <Box my={4}>
        <Input
          key={`items.${itemIndex}.link`}
          name={`items.${itemIndex}.link` as const}
          label="Embed Link"
          helperText="YouTube, Vimeo, DailyMotion link"
        />
        {error && <div>{error}</div>}
        {embedCode && <div dangerouslySetInnerHTML={{ __html: embedCode }} />}
        <Input
          type="hidden"
          key={`items.${itemIndex}.embed`}
          name={`items.${itemIndex}.embed` as const}
        />
      </Box>
      <Box my={4}>
        <Checkbox
          key={`items.${itemIndex}.showControls`}
          name={`items.${itemIndex}.showControls` as const}
          label="Show controls"
        />
      </Box>
      <Box my={4}>
        <Checkbox
          key={`items.${itemIndex}.autoAdvance`}
          name={`items.${itemIndex}.autoAdvance` as const}
          label="Auto Advance"
        />
      </Box>
      <Box my={4}>
        <Input
          key={`items.${itemIndex}.navigationTitle`}
          name={`items.${itemIndex}.navigationTitle` as const}
          label="Navigation Title"
        />
      </Box>
    </>
  )
}
