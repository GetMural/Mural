import {
  Checkbox as MuiCheckbox,
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

export default function Checkbox({ label, helperText, ...props }: Props) {
  const { control } = useFormContext<StoryState>()

  const {
    field: { ...otherFields },
    fieldState,
  } = useController({ control, ...props })

  return (
    <FormControl error={!!fieldState.error}>
      <FormControlLabel
        control={<MuiCheckbox {...otherFields} checked={!!otherFields.value} />}
        label={label}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
