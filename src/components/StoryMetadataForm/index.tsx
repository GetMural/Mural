import MuralForm from 'components/MuralForm'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { saveForm, StoryMetdataState } from 'store/slices/storyMetadata'
import fields from './fields'

export default function StoryMetadataForm() {
  const { handleSubmit, control, getValues, formState, setValue } =
    useForm<StoryMetdataState>()
  const onSubmit = handleSubmit((data) => dispatch(saveForm(data)))
  const formValue = useAppSelector((state) => state.storyMetadata)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    let key: keyof StoryMetdataState
    for (key in formValue) {
      if (Object.prototype.hasOwnProperty.call(formValue, key)) {
        if (getValues(key) !== formValue[key]) {
          setValue(key, formValue[key])
        }
      }
    }
  }, [formValue, setValue, getValues])

  return (
    <>
      <MuralForm
        onSubmit={onSubmit}
        fields={fields}
        values={formValue}
        control={control}
        getValues={getValues}
        formState={formState}
      ></MuralForm>
      <textarea rows={5} value={JSON.stringify(formValue, null, 2)} readOnly />
    </>
  )
}
