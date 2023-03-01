import {
  Radio,
  FormControl,
  FormControlLabel,
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
  time: number
}

export default function Timer({ onChange, time, ...props }: Props) {
  const { control } = useFormContext()

  const {
    field: { onChange: onChangeTimer, ...otherFields },
    fieldState: fieldStateTimer,
  } = useController({ control, ...props })

  return (
    <FormControl error={!!fieldStateTimer.error}>
      <FormLabel component="legend">You have chosen to enable timers</FormLabel>
      <RadioGroup
        row
        value={otherFields.value || ''}
        onChange={(event) => {
          const value = event.target.value
          onChangeTimer(value)
        }}
      >
        <FormControlLabel
          control={<Radio />}
          value="single"
          label={'Play Once'}
        />
        <FormControlLabel
          control={<Radio />}
          value="multiple"
          label={`Loop within timer of ${time} seconds`}
        />
      </RadioGroup>
    </FormControl>
  )
}
