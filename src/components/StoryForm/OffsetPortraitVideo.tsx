import {
  Radio,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  RadioGroup,
  Slider,
  Grow,
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
  // we assume here that the given name was a OffsetPortraitVideo
  name: `items.${number}.offsetPortraitVideo`
}

export default function OffsetPortraitVideo({
  label,
  helperText,
  onChange,
  name,
  ...props
}: Props) {
  const { control } = useFormContext()

  const {
    field: { onChange: onChangeAlign, ...otherFieldsAlign },
    fieldState: fieldStateAlign,
    // @ts-ignore we assume here that the given name was a OffsetPortraitVideo
  } = useController({ control, name: `${name}.align`, ...props })
  const {
    field: { onChange: onChangeCustomValue, ...otherFieldsCustomValue },
    // @ts-ignore we assume here that the given name was a OffsetPortraitVideo
  } = useController({ control, name: `${name}.customValue` as const, ...props })

  return (
    <FormControl error={!!fieldStateAlign.error}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        row
        value={otherFieldsAlign.value || ''}
        onChange={(event) => {
          const value = event.target.value
          onChangeAlign(value)
          if (value === 'custom') {
            onChangeCustomValue(0)
          }
        }}
        ref={otherFieldsAlign.ref}
        onBlur={otherFieldsAlign.onBlur}
      >
        <FormControlLabel control={<Radio />} value="left" label={'Left'} />
        <FormControlLabel control={<Radio />} value="center" label={'Center'} />
        <FormControlLabel control={<Radio />} value="right" label={'Right'} />
        <FormControlLabel
          control={<Radio />}
          value="custom"
          label={
            otherFieldsAlign.value === 'custom'
              ? `Custom ${otherFieldsCustomValue.value}%`
              : 'Custom'
          }
        />
      </RadioGroup>
      <Grow in={otherFieldsAlign?.value === 'custom'}>
        <div>
          <Slider
            value={Number(otherFieldsCustomValue.value)}
            onChange={(event, value) =>
              onChangeCustomValue(Array.isArray(value) ? value[0] : value)
            }
            valueLabelDisplay="auto"
            marks={[
              {
                value: 0,
                label: '0%',
              },
              {
                value: 50,
                label: '50%',
              },
              {
                value: 100,
                label: '100%',
              },
            ]}
            ref={otherFieldsCustomValue.ref}
          />
        </div>
      </Grow>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
