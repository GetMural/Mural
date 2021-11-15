import { ItemTypes } from 'store/slices/story'

const TYPES_LABELS: {
  [key in ItemTypes]: string
} = {
  imageAudio: 'Image Audio',
  backgroundImage: 'Background Image',
  backgroundVideo: 'Background Video',
  embedVideo: 'Embed Video',
  fullpageVideo: 'Fullpage video',
  horizontalSlideshow: 'Horizontal Slideshow',
  verticalSlideshow: 'Vertical Slideshow',
  parallaxImage: 'Parallax Image',
  text: 'Text',
  paywallSeparator: 'Paywall Separator',
  paywallSeparatorEnd: 'Paywall Separator End',
}

export default TYPES_LABELS
