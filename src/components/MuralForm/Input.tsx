import { TextField } from '@material-ui/core'
import { ReactNode } from 'react'
import {
  ControllerFieldState,
  useController,
  UseControllerProps,
  UseControllerReturn,
} from 'react-hook-form'
import { StoryState } from 'store/slices/story'
import useFormContext from './hooks/useFormContext'

interface Props extends UseControllerProps<StoryState> {
  label?: string
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
      placeholder={placeholder}
      fullWidth
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
