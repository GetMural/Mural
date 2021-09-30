import convert from 'draftjs-to-html'
import { RichText } from 'store/slices/story'

export default function convertToPlainText(richText: RichText) {
  if (richText.contentState) {
    return convert(JSON.parse(richText.contentState))
  }
}
