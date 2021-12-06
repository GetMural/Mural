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
  name: `items.${number}.alignBackgroundImageText`
}

export default function AlignBackgroundImageText({
  label,
  helperText,
  onChange,
  name,
  ...props
}: Props) {
  const { control } = useFormContext()

  const {
    field: { onChange: onChangeAlign },
    fieldState: fieldStateAlign,
    // @ts-ignore we assume here that the given name was a OffsetPortraitVideo
  } = useController({ control, name: `${name}.align`, ...props })

  return (
    <FormControl error={!!fieldStateAlign.error}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        row
        value={''}
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
