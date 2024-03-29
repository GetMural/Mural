import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Box,
} from '@mui/material'
import { ReactNode } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { Image as ImageType, StoryState } from 'store/slices/story'
import useFormContext from 'hooks/useFormContext'
import handleImageInput from 'utils/handleImageInput'
import media from 'utils/getMediaPath'
interface Props extends UseControllerProps<StoryState> {
  label: string
  helperText?: string | ReactNode
}

export default function Image({ label, helperText, ...props }: Props) {
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
            {field.value ? 'Change image' : 'Upload Image'}
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              hidden
              {...field}
              ref={undefined}
              value={undefined}
              onChange={async (e) => {
                if (e?.target?.files && e.target.files.length > 0) {
                  let res = await handleImageInput(e.target.files[0])
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
        <Box pt={2}>
          <img
            src={`file://${media((field.value as ImageType).small.path)}`}
            alt={label}
            style={{
              maxWidth: '100%',
              maxHeight: 300,
              objectFit: 'cover',
            }}
          />
        </Box>
      )}
    </FormControl>
  )
}
