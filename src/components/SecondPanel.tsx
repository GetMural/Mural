import { Button, Box, Typography, Slide, Input } from '@material-ui/core'
import StoryMetadata from 'components/MuralForm/forms/StoryMetadata'
import { useAppSelector } from 'store/hooks'
import BackgroundVideo from 'components/MuralForm/forms/BackgroundVideo'
import Text from 'components/MuralForm/forms/Text'
import useRouter from 'hooks/useRouter'
import { ItemTypes, selectedItemIndexSelector } from 'store/slices/story'
import BackIcon from '@material-ui/icons/ArrowBack'
import React from 'react'

const ItemFormComponents: {
  name: ItemTypes
  component: React.FunctionComponent<{ itemIndex: number }>
}[] = [
  { name: 'backgroundVideo', component: BackgroundVideo },
  { name: 'text', component: Text },
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
