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
  UseControllerReturn,
} from 'react-hook-form'
import { StoryState } from 'store/slices/story'
import useFormContext from 'hooks/useFormContext'

interface Props extends UseControllerProps<StoryState> {
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: UseControllerReturn['field']['onChange']
  ) => void
  label: string
  helperText?: string | ReactNode
}

export default function Checkbox({
  label,
  helperText,
  onChange,
  ...props
}: Props) {
  const { control } = useFormContext()

  const {
    field: { onChange: controllerOnChange, ...otherFields },
    fieldState,
  } = useController({ control, ...props })

  return (
    <FormControl error={!!fieldState.error}>
      <FormControlLabel
        control={
          <MuiCheckbox
            {...otherFields}
            onChange={(e) => {
              if (onChange) {
                onChange(e, controllerOnChange)
              } else {
                controllerOnChange(e, !e.target.checked)
              }
            }}
            checked={!!otherFields.value}
          />
        }
        label={label}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
