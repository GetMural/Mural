import UnsavedChanges from './dialogs/UnsavedChanges'
import FormIsNotValid from './dialogs/FormIsNotValid'
import UnmonetizingStory from './dialogs/UnmonetizingStory'
import MonetizingStory from './dialogs/MonetizingStory'
import PaymentSettings from './dialogs/PaymentSettings'
import ConfirmReset from './dialogs/ConfirmReset'
import useDialog from './useDialog'

export interface DialogProps {
  open: boolean
  onSubmit: (payload?: any) => void
  onDissmiss: () => void
}

const DIALOGS = [
  { name: 'UnsavedChanges', component: UnsavedChanges },
  { name: 'FormIsNotValid', component: FormIsNotValid },
  { name: 'UnmonetizingStory', component: UnmonetizingStory },
  { name: 'MonetizingStory', component: MonetizingStory },
  { name: 'PaymentSettings', component: PaymentSettings },
  { name: 'confirmReset', component: ConfirmReset },
] as const

export type DialogNames = typeof DIALOGS[number]['name']

export default function AlertDialog() {
  const { dialogState, ...others } = useDialog()
  return (
    <>
      {DIALOGS.map(({ name, component: Component }) => (
        <Component key={name} open={dialogState?.name === name} {...others} />
      ))}
    </>
  )
}
