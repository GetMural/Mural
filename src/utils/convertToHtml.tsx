import convert from 'draftjs-to-html'
import { RichText } from 'store/slices/story'

const customEntityTransform = (
  entity: { type: string; data: any; mutalibity: string },
  text: string
) => {
  // NOTE: dirty hack to convert locale image src (file:///) inlined in rich texts with relative path
  if (entity.type !== 'IMAGE' || !entity.data.src.startsWith('file:///')) {
    return undefined
  }
  return `<img src="${entity.data.src.replace(
    'file:///' + window.electron.directories.media,
    './media'
  )}" alt="${entity.data.alt}" style="height: ${entity.data.height};width: ${
    entity.data.width
  }"/>`
}

export default function convertToHtml(richText: RichText | null | undefined) {
  if (richText && richText.contentState) {
    return convert(
      JSON.parse(richText.contentState),
      undefined,
      undefined,
      customEntityTransform
    )
  }
}
