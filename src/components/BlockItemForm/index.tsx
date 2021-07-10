import { useAppSelector } from 'store/hooks'
import BackgroundVideo from './BackgroundVideo'

export default function BlockItemForm() {
  const currentItem = useAppSelector(
    (state) => state.navigation.view?.args?.item
  )
  if (currentItem.type === 'backgroundVideo') {
    return <BackgroundVideo />
  }
  return null
}
