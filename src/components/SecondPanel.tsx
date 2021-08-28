import { Button, Box, Typography, Slide, Input } from '@material-ui/core'
import StoryMetadata from 'components/MuralForm/forms/StoryMetadata'
import { useAppSelector } from 'store/hooks'
import BackgroundVideo from 'components/MuralForm/forms/BackgroundVideo'
import EmbedVideo from 'components/MuralForm/forms/EmbedVideo'
import ImageAudio from 'components/MuralForm/forms/ImageAudio'
import BackgroundImage from 'components/MuralForm/forms/BackgroundImage'
import ParallaxImage from 'components/MuralForm/forms/ParallaxImage'
import Slideshow from 'components/MuralForm/forms/Slideshow'
import Text from 'components/MuralForm/forms/Text'
import useRouter from 'hooks/useRouter'
import { ItemTypes, selectedItemIndexSelector } from 'store/slices/story'
import BackIcon from '@material-ui/icons/ArrowBack'
import React from 'react'
import TYPES_LABELS from 'constantes/blockTypes'

const ItemFormComponents: {
  name: ItemTypes
  component: React.FunctionComponent<{ itemIndex: number }>
}[] = [
  { name: 'backgroundVideo', component: BackgroundVideo },
  { name: 'text', component: Text },
  { name: 'embedVideo', component: EmbedVideo },
  { name: 'imageAudio', component: ImageAudio },
  { name: 'backgroundImage', component: BackgroundImage },
  { name: 'parallaxImage', component: ParallaxImage },
  { name: 'horizontalSlideshow', component: Slideshow },
  { name: 'verticalSlideshow', component: Slideshow },
]

export default function SecondPanel() {
  const currentView = useAppSelector((state) => state.navigation.view)
  const { goTo } = useRouter()
  const selectedItemIndex = useAppSelector(selectedItemIndexSelector)
  const SelectedItemComponent =
    currentView?.name === 'item' &&
    ItemFormComponents.find((o) => o.name === currentView.args.item.type)
      ?.component
  return (
    <div>
      {currentView && (
        <Button onClick={() => goTo({ view: null })} startIcon={<BackIcon />}>
          Back
        </Button>
      )}
      <Slide
        direction="left"
        in={currentView?.name === 'metadata'}
        mountOnEnter
        unmountOnExit
      >
        <div>
          <StoryMetadata />
        </div>
      </Slide>
      <Slide
        direction="left"
        in={currentView?.name === 'item'}
        mountOnEnter
        unmountOnExit
      >
        <div>
          {currentView?.name === 'item' && (
            <Typography variant="h3">
              {TYPES_LABELS[currentView.args.item.type]}
            </Typography>
          )}
          {selectedItemIndex !== undefined && SelectedItemComponent && (
            <>
              <Input
                type="hidden"
                key={`items.${selectedItemIndex}.type`}
                name={`items.${selectedItemIndex}.type` as const}
              />
              <SelectedItemComponent itemIndex={selectedItemIndex} />
            </>
          )}
        </div>
      </Slide>
      {/* empty view */}
      {!currentView && <EmptyView />}
    </div>
  )
}

function EmptyView() {
  return (
    <Box pt={18} textAlign="center">
      <Typography color="textSecondary" style={{ fontSize: 24 }}>
        Add Content Block to Get Started
      </Typography>
    </Box>
  )
}
