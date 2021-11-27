import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
} from '@mui/material'
import { Theme } from '@mui/material/styles'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import Input from 'components/StoryForm/Input'
import Wysiwyg from 'components/StoryForm/Wysiwyg'
import Image from 'components/StoryForm/Image'
import { useFieldArray } from 'react-hook-form'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '../Checkbox'
import getMediaPath from 'utils/getMediaPath'

interface Props {
  itemIndex: number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  })
)

export default function Slideshow({ itemIndex }: Props) {
  const classes = useStyles()
  const { fields, append, prepend, remove } = useFieldArray({
    name: `items.${itemIndex}.slides`,
  })

  return (
    <>
      <Box my={4}>
        <Wysiwyg
          key={`items.${itemIndex}.slideShowTitle`}
          name={`items.${itemIndex}.slideShowTitle` as const}
          label="Slideshow Title"
          placeholder="Your text here"
        />
      </Box>
      <Box my={4}>
        <Input
          key={`items.${itemIndex}.navigationTitle`}
          name={`items.${itemIndex}.navigationTitle` as const}
          label="Navigation Title"
          autoFocus
        />
      </Box>
      <Box my={4}>
        <Checkbox
          key={`items.${itemIndex}.light`}
          name={`items.${itemIndex}.light` as const}
          label="Black text on white background"
        />
      </Box>
      <Divider light />
      <Typography variant="h4">Items</Typography>
      {fields.length > 0 && (
        <Box mb={4} textAlign="center">
          <Button
            variant="contained"
            onClick={() => prepend({ __opened: true })}
          >
            Add Item
          </Button>
        </Box>
      )}
      {fields.length === 0 && (
        <Typography
          variant="body2"
          style={{ textAlign: 'center', marginTop: 20 }}
        >
          There is no item yet.
        </Typography>
      )}
      {fields.map((field, index) => (
        <Accordion key={field.id} defaultExpanded={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display="flex" alignItems="center">
              <IconButton
                onClick={(event) => {
                  event.stopPropagation()
                  remove(index)
                }}
                onFocus={(event) => event.stopPropagation()}
                size="large"
              >
                <DeleteIcon />
              </IconButton>
              <Typography className={classes.heading}>
                {/* @ts-ignore */}
                {field.slideTitle || `Slide ${index + 1}`}
              </Typography>
              {/* @ts-ignore */}
              {field.image && (
                <Avatar
                  style={{ marginLeft: 20 }}
                  // @ts-ignore
                  src={'file:///' + getMediaPath(field.image.square.path)}
                />
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box width="100%">
              <Box my={4}>
                <Image
                  name={`items.${itemIndex}.slides.${index}.image`}
                  label="Image"
                />
              </Box>
              <Box my={4}>
                <Input
                  name={
                    `items.${itemIndex}.slides.${index}.slideTitle` as const
                  }
                  label="Slide Title"
                />
              </Box>
              <Box my={4}>
                <Input
                  name={
                    `items.${itemIndex}.slides.${index}.slideCredits` as const
                  }
                  label="Slide Credits"
                />
              </Box>
              <Box my={4}>
                <Input
                  name={
                    `items.${itemIndex}.slides.${index}.slideImageAltText` as const
                  }
                  label="Image Alt Text"
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
      <Box mt={4} textAlign="center">
        <Button variant="contained" onClick={() => append({})}>
          Add Item
        </Button>
      </Box>
    </>
  )
}
