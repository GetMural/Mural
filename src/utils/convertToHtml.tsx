import convert from 'draftjs-to-html'
import { RichText } from 'store/slices/story'

export default function convertToHtml(richText: RichText | null | undefined) {
  if (richText && richText.contentState) {
    return convert(JSON.parse(richText.contentState))
  }
}
