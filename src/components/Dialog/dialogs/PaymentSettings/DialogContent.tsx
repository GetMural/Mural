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
} from '@material-ui/core'
import { useAppDispatch } from 'store/hooks'
import { DialogProps } from 'components/Dialog'
import RemoveIcon from '@material-ui/icons/Delete'
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'
import { useAppSelector } from 'store/hooks'
import { setPaymentSettings, SettingsState } from 'store/slices/settings'
import React from 'react'
import { DevTool } from '@hookform/devtools'
import { cloneDeep } from 'lodash'

interface CustomInputProps<InputType> extends StandardTextFieldProps {
  name: Path<InputType>
  register: UseFormRegister<InputType>
  options?: RegisterOptions
}

export default function PaymentSettingsDialogContent({
  onSubmit,
  onDissmiss,
}: Pick<DialogProps, 'onDissmiss' | 'onSubmit'>) {
  const dispatch = useAppDispatch()
  const paymentSettings = useAppSelector((state) => state.settings.payment)
  const {
    register,
    control,
    handleSubmit,
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

  return (
    <>
      <DevTool control={control} placement="bottom-left" />
      <DialogTitle id="alert-dialog-title">Payment Settings</DialogTitle>

      <DialogContent>
        <Typography variant="h3" color="textSecondary" gutterBottom>
          Live Payment
        </Typography>
        <Typography gutterBottom>
          To receive live payments while a viewer engages with your content,
          please add your walletʼ s information below. To split payments between
          multiple pointers, add additional pointers below and indicate the
          percentage of payments (out of 100) to be received by each pointer.
          Please note that Mural received 10% of all payments.
        </Typography>
        <Box my={4}>
          {fields.map((field, index) => (
            <Box key={field.id} display="flex" mb={4}>
              <Input
                register={register}
                key={`pointers.${index}.name`}
                name={`pointers.${index}.name`}
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
                register={register}
                key={`pointers.${index}.pointer`}
                name={`pointers.${index}.pointer`}
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
                register={register}
                key={`pointers.${index}.share`}
                name={`pointers.${index}.share`}
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
                <IconButton onClick={() => remove(index)}>
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
          >
            Add a pointer
          </Button>
        </Box>

        <Typography gutterBottom>
          If you donʼt currently have a wallet, you can set one up quickly and
          easily. First, please set up your account on Coil. Then fetch your
          Payment Pointer.
        </Typography>
        <Box my={4}>
          <Box mr={10} component="span">
            <Link target="_blank" href="https://coil.com/">
              Set Up Coil
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
            Create a unique code below (12-15 characters) to allow subscribers
            from your donation and subscription services (Patreon, Ko-Fi,
            PayPal, etc.) to access paid content. You can share this code with
            your funders and subscribers on these services, or by email.
          </Typography>
        </Box>
        <Box my={4}>
          <Input
            register={register}
            label="Your access code"
            placeholder="yzYCMJWlFfHgzQ"
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
  register,
  options,
  ...textFieldProps
}: CustomInputProps<SettingsState['payment']>) {
  const field = register(name, options)
  return (
    <TextField
      inputRef={field.ref}
      name={field.name}
      onChange={field.onChange}
      onBlur={field.onBlur}
      variant="outlined"
      required={!!options?.required}
      {...textFieldProps}
    />
  )
}
