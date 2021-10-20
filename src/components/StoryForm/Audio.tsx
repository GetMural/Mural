import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Box,
} from '@mui/material'
import { ReactNode } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { StoryState, Audio as AudioType } from 'store/slices/story'
import useFormContext from 'hooks/useFormContext'
import handleAudioInput from 'utils/handleAudioInput'
import media from 'utils/getMediaPath'

interface Props extends UseControllerProps<StoryState> {
  label: string
  helperText?: string | ReactNode
}

export default function Audio({ label, helperText, ...props }: Props) {
  const { control } = useFormContext()

  const { field } = useController({ control, ...props })

  return (
    <FormControl>
      <FormControlLabel
        control={
          <Button
            variant="contained"
            component="label"
            style={{ marginLeft: 12, marginRight: 12 }}
          >
            {field.value ? 'Change Audio' : 'Choose Audio'}
            <input
              type="file"
              accept="audio/mpeg"
              hidden
              {...field}
              ref={undefined}
              value={undefined}
              onChange={async (e) => {
                if (e?.target?.files && e.target.files.length > 0) {
                  let res = await handleAudioInput(e.target.files[0])
                  field.onChange(res)
                }
              }}
            />
          </Button>
        }
        label={label}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {field.value && (
        <Box my={2}>
          <audio controls>
            <source
              src={`file://${media((field.value as AudioType).path)}`}
              type={'audio/mp3'}
            />
            Your browser does not support the audio tag.
          </audio>
        </Box>
      )}
    </FormControl>
  )
}
