import { FormEventHandler, ReactNode } from 'react'
import {
  TextField,
  Button,
  Box,
  Switch,
  FormControlLabel,
  FormControl,
  FormHelperText,
  Checkbox,
} from '@material-ui/core'
import {
  Controller,
  RegisterOptions,
  UseControllerReturn,
  Path,
  FieldError,
  UseFormGetValues,
  Control,
  FormState,
} from 'react-hook-form'

export interface Field<MuralFormType> {
  name: Extract<keyof MuralFormType, Path<MuralFormType>>
  label: string
  type?: 'switch' | 'checkbox' | 'text' | 'url' | 'image'
  placeholder?: string
  rules?: RegisterOptions
  helperText?: string | ReactNode
}

interface Props<MuralFormInputs> {
  onSubmit: FormEventHandler<HTMLFormElement>
  fields: Field<MuralFormInputs>[]
  values: MuralFormInputs
  control: Control<MuralFormInputs>
  getValues: UseFormGetValues<MuralFormInputs>
  formState: FormState<MuralFormInputs>
}

export default function MuralForm<MuralFormInputs>({
  onSubmit,
  fields,
  values,
  control,
  getValues,
  formState,
}: Props<MuralFormInputs>) {
  return (
    <>
      <form onSubmit={onSubmit}>
        <Box
          my={4}
          textAlign="right"
          style={{
            position: 'sticky',
            top: 0,
            right: 0,
          }}
        >
          <Button
            type="submit"
            size="large"
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </Box>
        {fields.map((field) => (
          <Box my={4} key={field.name}>
            <Controller
              name={field.name}
              control={control}
              defaultValue={values[field.name]}
              rules={field.rules}
              render={renderField(formState, getValues, field)}
            />
          </Box>
        ))}
      </form>
    </>
  )
}

function renderField<MuralFormInputs>(
  formState: FormState<MuralFormInputs>,
  getValues: UseFormGetValues<MuralFormInputs>,
  field: Field<MuralFormInputs>
) {
  function getErrorMsg(formStatefield: Field<MuralFormInputs>) {
    const value = getValues(field.name)
    const error = formState.errors[field.name] as FieldError
    if (error) {
      if (error.message) {
        return error.message
      }
      if (error?.type === 'required') {
        return 'Field is required'
      } else if (typeof value === 'string' && error?.type === 'minLength') {
        return `Should have ${field.rules?.minLength} caracters minimum. Currently it's ${value.length}`
      } else if (typeof value === 'string' && error?.type === 'maxLength') {
        return `Should have ${field.rules?.maxLength} caracters maximum. Currently it's ${value.length}`
      }
    }
  }

  return ({ field: inputField }: UseControllerReturn) => {
    let helperText = getErrorMsg(field) || field.helperText
    switch (field.type) {
      case 'switch':
        return (
          <FormControl error={!!formState.errors[field.name]}>
            <FormControlLabel
              control={<Switch {...inputField} name={field.name} />}
              label={field.label}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        )
      case 'checkbox':
        return (
          <FormControl error={!!formState.errors[field.name]}>
            <FormControlLabel
              control={<Checkbox {...inputField} name={field.name} />}
              label={field.label}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        )
      case 'image':
        return (
          <FormControl>
            <FormControlLabel
              control={
                <Button
                  variant="contained"
                  component="label"
                  style={{ marginLeft: 12, marginRight: 12 }}
                >
                  Upload Image
                  <input
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    hidden
                  />
                </Button>
              }
              label={field.label}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        )

      default:
        return (
          <TextField
            {...inputField}
            label={field.label}
            type={
              field.type && ['url'].indexOf(field.type) > -1
                ? field.type
                : undefined
            }
            placeholder={field.placeholder}
            fullWidth
            variant="outlined"
            required={!!field.rules?.required}
            error={!!formState.errors[field.name]}
            helperText={helperText}
          />
        )
    }
  }
}
