import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Link,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  StandardTextFieldProps,
  FormControlLabel,
  Switch as MuiSwitch,
} from '@mui/material'
import { useAppDispatch } from 'store/hooks'
import { DialogProps } from 'components/Dialog'
import RemoveIcon from '@mui/icons-material/Delete'
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Path,
  RegisterOptions,
  useController,
  Control,
  FieldValues,
} from 'react-hook-form'
import { useAppSelector } from 'store/hooks'
import { setPaymentSettings, SettingsState } from 'store/slices/settings'
import React from 'react'
import { cloneDeep } from 'lodash'

interface CustomInputProps<InputType extends FieldValues>
  extends StandardTextFieldProps {
  name: Path<InputType>
  control: Control<InputType>
  options?: RegisterOptions
}

export default function PaymentSettingsDialogContent({
  onSubmit,
  onDissmiss,
}: Pick<DialogProps, 'onDissmiss' | 'onSubmit'>) {
  const dispatch = useAppDispatch()
  const paymentSettings = useAppSelector((state) => state.settings.payment)
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty, errors },
  } = useForm<SettingsState['payment']>({
    defaultValues: paymentSettings,
    reValidateMode: 'onChange',
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'pointers',
  })

  React.useEffect(() => {
    fields.forEach((field, index) => {
      const newShare = 100 / fields.length
      // if different and if form is dirty (skip initial state)
      if (field.share !== newShare && isDirty) {
        setValue(`pointers.${index}.share`, newShare)
      }
    })
  }, [setValue, fields, isDirty])

  const onSubmitForm: SubmitHandler<SettingsState['payment']> = (data) => {
    dispatch(cloneDeep(setPaymentSettings(data)))
    // close modal
    onSubmit()
  }

  const onSaveClick = () => {
    handleSubmit(onSubmitForm)()
  }

  const featureEnabled = watch('enabled')

  return (
    <>
      <DialogTitle id="alert-dialog-title">Payment Settings</DialogTitle>

      <DialogContent>
        <Box mb={4}>
          <Switch
            name={`enabled`}
            key={`enabled`}
            label={'Enable payment features'}
            control={control}
          />
        </Box>
        <Typography variant="h3" color="textSecondary" gutterBottom>
          Web Monetization Live Payment
        </Typography>
        <Typography gutterBottom>
          To receive web monetization live payments while a viewer engages with
          your content, please add your payment pointer information below. To
          split payments between multiple payment pointers, add them below and
          indicate the percentage of payments (out of 100) to be received by
          each pointer. Please note that Mural receives 10% of all web
          monetization payments. This helps us maintain the software and related
          services. To find out more about Coil's web monetization service,
          please visit the link below.
        </Typography>
        <Box my={4}>
          {fields.map((field, index) => (
            <Box key={field.id} display="flex" mb={4}>
              <Input
                control={control}
                key={`pointers.${index}.name`}
                name={`pointers.${index}.name`}
                disabled={!featureEnabled}
                options={{
                  required: fields.length > 1 ? 'Required' : undefined,
                }}
                label="Name"
                placeholder="Editorial Team"
                style={{ marginRight: 10 }}
                error={errors.pointers && !!errors.pointers[index]?.name}
                helperText={
                  errors?.pointers && errors.pointers[index]?.name?.message
                }
              />
              <Input
                control={control}
                key={`pointers.${index}.pointer`}
                name={`pointers.${index}.pointer`}
                disabled={!featureEnabled}
                options={{
                  required: fields.length > 1 ? 'Required' : undefined,
                }}
                label="Pointer"
                placeholder="$ilp.gatehub.net/XXXXXXXX"
                style={{ marginRight: 10, flexGrow: 1 }}
                error={errors.pointers && !!errors.pointers[index]?.pointer}
                helperText={
                  errors?.pointers && errors.pointers[index]?.pointer?.message
                }
              />
              <Input
                control={control}
                key={`pointers.${index}.share`}
                name={`pointers.${index}.share`}
                disabled={!featureEnabled}
                label="Share"
                placeholder="100"
                type="number"
                inputProps={{
                  min: 0,
                  max: 100,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                error={errors.pointers && !!errors.pointers[index]?.share}
                helperText={
                  errors?.pointers && errors.pointers[index]?.share?.message
                }
                style={{ maxWidth: 120 }}
                options={{
                  required: fields.length > 1 ? 'Required' : undefined,
                  max: 100,
                  min: 0,
                  valueAsNumber: true,
                }}
              />
              {fields.length > 1 && (
                <IconButton
                  disabled={!featureEnabled}
                  onClick={() => remove(index)}
                  size="large"
                >
                  <RemoveIcon />
                </IconButton>
              )}
            </Box>
          ))}
        </Box>
        <Box my={4}>
          <Button
            onClick={() => append({ name: '', pointer: '', share: 0 })}
            variant="contained"
            disabled={!featureEnabled}
          >
            Add a pointer
          </Button>
        </Box>

        <Typography gutterBottom>
          If you donʼt currently have an online wallet that supports interledger
          protocol (ILP), you can set one up quickly and easily by creating an
          account on a service that supports ILP-enabled wallets like Uphold or
          Gatehub. Then copy your ILP payment pointer here.
        </Typography>
        <Box my={4}>
          <Box mr={10} component="span">
            <Link target="_blank" href="https://coil.com/learn-more">
              Learn more about Coil
            </Link>
          </Box>
          <Link
            // variant=""
            target="_blank"
            href="https://webmonetization.org/docs/ilp-wallets/"
          >
            Fetch Pointer
          </Link>
        </Box>

        <Box my={4}>
          <Typography variant="h3" color="textSecondary" gutterBottom>
            Access Code
          </Typography>
          <Typography gutterBottom>
            Create a unique code below (12-15 characters) to allow your
            supporters on donation and subscription services (Patreon, Ko-Fi,
            PayPal, etc.) to access exclusive content. You can share this code
            with your supporters on these services, or by email.
          </Typography>
        </Box>
        <Box my={4}>
          <Input
            control={control}
            label="Your access code"
            placeholder="yzYCMJWlFfHgzQ"
            disabled={!featureEnabled}
            key={'accessCode'}
            name={'accessCode'}
            error={!!errors?.accessCode}
            helperText={errors?.accessCode && errors?.accessCode.message}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDissmiss}>Cancel</Button>
        <Button onClick={onSaveClick}>Ok</Button>
      </DialogActions>
    </>
  )
}

function Input({
  name,
  control,
  options,
  ...textFieldProps
}: CustomInputProps<SettingsState['payment']>) {
  const { field } = useController({ name, control })
  return (
    <TextField
      inputRef={field.ref}
      name={field.name}
      onChange={(e) => field.onChange(e.target.value)}
      value={field.value}
      onBlur={field.onBlur}
      variant="outlined"
      required={!!options?.required}
      {...textFieldProps}
    />
  )
}

function Switch({ name, control, register, options, ...props }: any) {
  const { field } = useController({ name, control })

  return (
    <FormControlLabel
      control={
        <MuiSwitch
          {...field}
          onChange={(e) => field.onChange(e.target.checked)}
          checked={field.value}
          inputRef={field.ref}
        />
      }
      label={props.label}
    />
  )
}
