import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core'
import { ReactNode } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { StoryState, Video as VideoType } from 'store/slices/story'
import useFormContext from 'hooks/useFormContext'
import handleVideoInput from 'utils/handleVideoInput'
import media from 'utils/getMediaPath'
interface Props extends UseControllerProps<StoryState> {
  label: string
  helperText?: string | ReactNode
}

export default function Video({ label, helperText, ...props }: Props) {
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
            {field.value ? 'Change Video' : 'Choose Video'}
            <input
              type="file"
              accept="video/mp4, video/webm, video/ogg"
              hidden
              {...field}
              ref={undefined}
              value={undefined}
              onChange={async (e) => {
                if (e?.target?.files && e.target.files.length > 0) {
                  let res = await handleVideoInput(e.target.files[0])
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
        <div>
          <video width="320" height="240" controls>
            <source
              src={`file://${media((field.value as VideoType).path)}`}
              type={'video/mp4'}
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </FormControl>
  )
}
