import { TextField } from '@mui/material'
import { ReactNode } from 'react'
import {
  ControllerFieldState,
  useController,
  UseControllerProps,
  UseControllerReturn,
} from 'react-hook-form'
import { StoryState } from 'store/slices/story'
import useFormContext from 'hooks/useFormContext'

interface Props extends UseControllerProps<StoryState> {
  label?: string
  placeholder?: string
  helperText?: string | ReactNode
  autoFocus?: boolean
  multiline?: boolean
  type?: React.InputHTMLAttributes<unknown>['type']
  style?: React.CSSProperties
}

export default function Input({
  label,
  type,
  placeholder,
  helperText,
  autoFocus,
  style,
  multiline,
  ...props
}: Props) {
  const { control } = useFormContext()

  const {
    field: { ref, ...otherFields },
    fieldState,
  } = useController({ control, ...props })

  if (type === 'hidden') {
    return (
      <input
        type="hidden"
        ref={ref}
        {...otherFields}
        value={otherFields.value as string}
      />
    )
  }

  return (
    <TextField
      {...otherFields}
      value={otherFields.value || ''}
      inputRef={ref}
      label={label}
      type={type}
      multiline={multiline}
      placeholder={placeholder}
      autoFocus={autoFocus}
      fullWidth
      style={style}
      variant="outlined"
      required={!!props.rules?.required}
      error={!!fieldState.error}
      helperText={
        getErrorMessage(props.rules, otherFields.value, fieldState) ||
        helperText ||
        undefined
      }
    />
  )
}

function getErrorMessage(
  rules: UseControllerProps['rules'],
  value: UseControllerReturn['field']['value'],
  fieldState: ControllerFieldState
) {
  let error = fieldState.error
  if (error) {
    if (error.message) {
      return error.message
    } else if (
      rules &&
      typeof value === 'string' &&
      error?.type === 'minLength'
    ) {
      return `Should have ${rules.minLength} caracters minimum. Currently it's ${value.length}`
    } else if (
      rules &&
      typeof value === 'string' &&
      error?.type === 'maxLength'
    ) {
      return `Should have ${rules.maxLength} caracters maximum. Currently it's ${value.length}`
    }
  }
}
