import { Grid, Button } from '@material-ui/core'
import { useAppDispatch } from 'store/hooks'
import { addItemAndGoToView, ItemTypes } from 'store/slices/story'

import audio_image_mural from './icons/audio_image_mural.png'
import bg_image_mural from './icons/bg_image_mural.png'
import bg_video_mural from './icons/bg_video_mural.png'
import embed_video_mural from './icons/embed_video_mural.png'
import fp_video_mural from './icons/fp_video_mural.png'
import H_slide_mural from './icons/H_slide_mural.png'
import parallax_image_mural from './icons/parallax_image_mural.png'
import text_mural from './icons/text_mural.png'
import V_slide_mural from './icons/V_slide_mural.png'
import useAskToSaveChanges from 'hooks/useAskToSaveChanges'
import TYPES_LABELS from 'constantes/blockTypes'

const icons: {
  label: string
  name: ItemTypes
  icon: string
  disabled?: boolean
}[] = [
  {
    name: 'imageAudio',
    label: TYPES_LABELS['imageAudio'],
    icon: audio_image_mural,
  },
  {
    name: 'backgroundImage',
    label: TYPES_LABELS['backgroundImage'],
    icon: bg_image_mural,
    disabled: true,
  },
  {
    name: 'backgroundVideo',
    label: TYPES_LABELS['backgroundVideo'],
    icon: bg_video_mural,
  },
  {
    name: 'embedVideo',
    label: TYPES_LABELS['embedVideo'],
    icon: embed_video_mural,
  },
  {
    name: 'fullpageVideo',
    label: TYPES_LABELS['fullpageVideo'],
    icon: fp_video_mural,
    disabled: true,
  },
  {
    name: 'horizontalSlideshow',
    label: TYPES_LABELS['horizontalSlideshow'],
    icon: H_slide_mural,
    disabled: true,
  },
  {
    name: 'verticalSlideshow',
    label: TYPES_LABELS['verticalSlideshow'],
    icon: V_slide_mural,
    disabled: true,
  },
  {
    name: 'parallaxImage',
    label: TYPES_LABELS['parallaxImage'],
    icon: parallax_image_mural,
    disabled: true,
  },
  {
    name: 'text',
    label: TYPES_LABELS['text'],
    icon: text_mural,
  },
]

export default function BlockItemsSelector() {
  const dispatch = useAppDispatch()
  const askToSaveChanges = useAskToSaveChanges()

  return (
    <Grid container spacing={4}>
      {icons.map(({ name, label, icon, disabled }) => (
        <Grid item xs={6} md={4} key={name}>
          <Button
            style={{ display: 'block', width: '100%' }}
            variant="outlined"
            disabled={disabled}
            onClick={() => {
              askToSaveChanges().then((res) => {
                if (res) {
                  dispatch(addItemAndGoToView(name))
                }
              })
            }}
          >
            <img src={icon} style={{ width: '100%' }} alt={label} />
            <div>{label}</div>
          </Button>
        </Grid>
      ))}
    </Grid>
  )
}
