import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core'
import { ReactNode } from 'react'
import {
  useController,
  UseControllerProps,
  useFormContext,
} from 'react-hook-form'
import { StoryState } from 'store/slices/story'

interface Props extends UseControllerProps<StoryState> {
  label: string
  helperText?: string | ReactNode
}

export default function Image({ label, helperText, ...props }: Props) {
  const { control } = useFormContext<StoryState>()

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
                  const b64 = await toBase64(e.target.files[0])
                  if (b64) {
                    field.onChange(b64)
                  }
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
          <img
            src={field.value as string}
            alt={label}
            style={{
              maxWidth: '100%',
              maxHeight: 300,
              objectFit: 'cover',
            }}
          />
        </div>
      )}
    </FormControl>
  )
}

const toBase64 = (file: File) =>
  new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
