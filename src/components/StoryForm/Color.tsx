import React from 'react'
import { ChromePicker, Color as ColorType } from 'react-color'
import { useController, UseControllerProps } from 'react-hook-form'
import {
  Checkbox,
  Grow,
  Typography,
  FormControl,
  FormControlLabel,
} from '@mui/material'
import { StoryState } from 'store/slices/story'

interface Props extends UseControllerProps<StoryState> {
  label: string
}

export default function Color({ label, control, ...props }: Props) {
  const { field } = useController({ control, ...props })
  const [enabled, setEnabled] = React.useState(false)

  React.useEffect(() => {
    //   when a value is set, color is enabled defacto
    if (field.value && !enabled) {
      setEnabled(true)
    }
  }, [field.value, enabled])

  return (
    <div>
      <Typography gutterBottom>{label}</Typography>
      <FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={!enabled}
              onChange={() => {
                if (enabled) {
                  field.onChange(undefined)
                  setEnabled(false)
                } else {
                  setEnabled(true)
                }
              }}
            />
          }
          label="Disabled"
        />
      </FormControl>
      <Grow in={enabled}>
        <div>
          <ChromePicker
            color={field.value as ColorType}
            onChangeComplete={(val) => field.onChange(val.rgb)}
            ref={field.ref}
          />
        </div>
      </Grow>
    </div>
  )
}
