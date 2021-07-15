import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core'
import { useAppDispatch } from 'store/hooks'
import { addItemAndGoToView, ItemTypes } from 'store/slices/story'
import { makeStyles } from '@material-ui/core/styles'

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

const icons: {
  label: string
  name: ItemTypes
  description?: string
  icon: string
  disabled?: boolean
}[] = [
  {
    label: 'Image Audio',
    name: 'imageAudio',
    description: 'Image with Audio',
    icon: audio_image_mural,
    disabled: true,
  },
  {
    label: 'Background Image',
    name: 'backgroundImage',
    icon: bg_image_mural,
    disabled: true,
  },
  {
    label: 'Background Video',
    name: 'backgroundVideo',
    icon: bg_video_mural,
  },
  {
    label: 'Embed Video',
    name: 'embedVideo',
    icon: embed_video_mural,
    disabled: true,
  },
  {
    label: 'Fullpage video',
    name: 'fullpageVideo',
    icon: fp_video_mural,
    disabled: true,
  },
  {
    label: 'Horizontal Slideshow',
    name: 'horizontalSlideshow',
    icon: H_slide_mural,
    disabled: true,
  },
  {
    label: 'Vertical Slideshow',
    name: 'verticalSlideshow',
    icon: V_slide_mural,
    disabled: true,
  },
  {
    label: 'Parallax Image',
    name: 'parallaxImage',
    icon: parallax_image_mural,
    disabled: true,
  },
  {
    label: 'Text',
    name: 'text',
    icon: text_mural,
    disabled: true,
  },
]

const useStyles = makeStyles((theme) => ({
  card: {},
  media: {
    height: 80,
    margin: theme.spacing(2),
    backgroundSize: 'contain',
    backgroundPosition: 'top',
  },
}))

export default function BlockItemsSelector() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const askToSaveChanges = useAskToSaveChanges()
  return (
    <Grid container spacing={4}>
      {icons.map(({ name, label, description, icon, disabled }) => (
        <Grid item xs={6} md={4} key={name}>
          <Card className={classes.card}>
            <CardActionArea
              disabled={disabled}
              onClick={() => {
                askToSaveChanges()
                  .then(() => {
                    dispatch(addItemAndGoToView(name))
                  })
                  .catch(() => {})
              }}
            >
              <CardMedia image={icon} title={name} className={classes.media} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {label}
                </Typography>
                {description && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {description}
                  </Typography>
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
