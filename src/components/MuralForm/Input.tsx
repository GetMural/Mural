import { TextField } from '@material-ui/core'
import { ReactNode } from 'react'
import {
  useController,
  UseControllerProps,
  useFormContext,
} from 'react-hook-form'
import { StoryState } from 'store/slices/story'

interface Props extends UseControllerProps<StoryState> {
  label: string
  placeholder?: string
  helperText?: string | ReactNode
  type?: React.InputHTMLAttributes<unknown>['type']
}

export default function Input({
  label,
  type,
  placeholder,
  helperText,
  ...props
}: Props) {
  const { control } = useFormContext<StoryState>()

  const {
    field: { ref, ...otherFields },
    fieldState,
  } = useController({ control, ...props })

  return (
    <TextField
      {...otherFields}
      inputRef={ref}
      label={label}
      type={type}
      placeholder={placeholder}
      fullWidth
      variant="outlined"
      required={!!props.rules?.required}
      error={!!fieldState.error}
      helperText={helperText}
    />
  )
}
