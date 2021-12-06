import {
  Radio,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  RadioGroup,
} from '@mui/material'
import React from 'react'
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
  helperText?: string | React.ReactNode
}

export default function Align({
  label,
  helperText,
  onChange,
  ...props
}: Props) {
  const { control } = useFormContext()

  const {
    field: { onChange: onChangeAlign, ...otherFields },
    fieldState: fieldStateAlign,
  } = useController({ control, ...props })

  return (
    <FormControl error={!!fieldStateAlign.error}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        row
        value={otherFields.value || ''}
        onChange={(event) => {
          const value = event.target.value
          onChangeAlign(value)
        }}
      >
        <FormControlLabel control={<Radio />} value="left" label={'Left'} />
        <FormControlLabel control={<Radio />} value="center" label={'Center'} />
        <FormControlLabel control={<Radio />} value="right" label={'Right'} />
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
