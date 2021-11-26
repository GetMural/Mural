import { Button, Box, Typography, Slide, Input } from '@mui/material'
import StoryMetadata from 'components/StoryForm/forms/StoryMetadata'
import { useAppSelector } from 'store/hooks'
import BackgroundVideo from 'components/StoryForm/forms/BackgroundVideo'
import EmbedVideo from 'components/StoryForm/forms/EmbedVideo'
import ImageAudio from 'components/StoryForm/forms/ImageAudio'
import BackgroundImage from 'components/StoryForm/forms/BackgroundImage'
import ParallaxImage from 'components/StoryForm/forms/ParallaxImage'
import Slideshow from 'components/StoryForm/forms/Slideshow'
import FullpageVideo from 'components/StoryForm/forms/FullpageVideo'
import Text from 'components/StoryForm/forms/Text'
import useRouter from 'hooks/useRouter'
import { ItemTypes, selectedItemIndexSelector } from 'store/slices/story'
import BackIcon from '@mui/icons-material/ArrowBack'
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
  { name: 'fullpageVideo', component: FullpageVideo },
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
      <Slide
        direction="left"
        in={currentView?.name === 'metadata'}
        mountOnEnter
        unmountOnExit
      >
        <Box position="relative">
          {currentView && (
            <Box position="absolute" top={2}>
              <Button
                onClick={() => goTo({ view: null })}
                startIcon={<BackIcon />}
              >
                Back
              </Button>
            </Box>
          )}
          <StoryMetadata />
        </Box>
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
