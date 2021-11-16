import React from 'react'
import { useAppSelector, useAppDispatch } from 'store/hooks'
import {
  unshiftPaywallSeparator,
  removePaywallSeparator,
} from 'store/slices/story'

/** Listen to payment settings and story to add or remove
 * the paywall separator in the block item list
 */
export default function usePaymentSeparatorListener() {
  const paymentIsEnabled = useAppSelector(
    (state) => state.settings.payment.enabled
  )
  const story = useAppSelector((state) => state.story)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    let paywallSeparatorIndex = story.items?.findIndex(
      (i) => i.type === 'paywallSeparator'
    )
    if (paymentIsEnabled) {
      if (paywallSeparatorIndex === -1) {
        dispatch(unshiftPaywallSeparator())
      }
    } else {
      if (paywallSeparatorIndex !== undefined && paywallSeparatorIndex > -1) {
        dispatch(removePaywallSeparator())
      }
    }
  }, [paymentIsEnabled, dispatch, story])
}
