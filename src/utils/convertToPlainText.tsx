import { convertFromRaw } from 'draft-js'
import { RichText } from 'store/slices/story'

export default function convertToPlainText(richText: RichText) {
  if (richText.contentState) {
    return convertFromRaw(JSON.parse(richText.contentState)).getPlainText()
  }
}
