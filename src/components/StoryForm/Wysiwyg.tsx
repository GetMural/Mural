import { FormLabel, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { ReactNode } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { RichText, StoryState } from 'store/slices/story'
import useFormContext from 'hooks/useFormContext'
import { Editor } from 'react-draft-wysiwyg'
import React from 'react'
import clsx from 'clsx'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {
  ContentState,
  convertFromHTML,
  convertFromRaw,
  convertToRaw,
  EditorState,
} from 'draft-js'
import handleImageInput from 'utils/handleImageInput'
import { Box } from '@mui/system'

const useStyles = makeStyles((theme) => ({
  wysiwygToolbar: {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.primary,
  },
  wysiwygEditor: {
    padding: theme.spacing(1),
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.23)',
    borderStyle: 'solid',
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.primary,
    '& .rdw-image-imagewrapper img': {
      maxWidth: '100%',
    },
  },
  wysiwygEditorFocused: {
    borderWidth: 2,
    borderColor: theme.palette.primary.main,
  },
}))

interface Props extends UseControllerProps<StoryState> {
  label?: string
  placeholder?: string
  helperText?: string | ReactNode
  autoFocus?: boolean
}

export default function Wysiwyg({
  label,
  placeholder,
  helperText,
  autoFocus,
  ...props
}: Props) {
  const classes = useStyles()
  const { control } = useFormContext()

  const {
    field: { ref, value, onChange, onBlur },
  } = useController({ control, ...props })

  const [wysiwygStatus, setWysiwygStatus] = React.useState<
    'focused' | 'blured'
  >()

  let [editorState, setEditorState] = React.useState(EditorState.createEmpty())

  // we store here if we already set the value to the editor
  // (we only need to set it once, when available)
  const renderRef = React.useRef(false)
  React.useEffect(() => {
    let content
    if (!renderRef.current && value) {
      if ((value as unknown as RichText).contentState) {
        content = convertFromRaw(
          JSON.parse((value as unknown as RichText).contentState)
        )
        // support for version <= 1.5.16 where some fields were input[type=text]
      } else if (typeof value === 'string') {
        const blocksFromHTML = convertFromHTML(value)
        content = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        )
      } else {
        console.error('Unknown type for Wysiwyg', { value }, typeof value)
        const blocksFromHTML = convertFromHTML(value.toString())
        content = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        )
      }
      setEditorState(EditorState.createWithContent(content))
      renderRef.current = true
    }
  }, [value])

  async function uploadImageCallBack(file: File) {
    const location = await handleImageInput(file)
    return {
      data: {
        link: 'media://' + location.big.path,
      },
    }
  }

  return (
    <div>
      <Box mb={1}>
        <FormLabel>{label}</FormLabel>
      </Box>
      <Editor
        editorState={editorState}
        ref={ref}
        toolbarClassName={clsx(classes.wysiwygToolbar)}
        editorClassName={clsx(classes.wysiwygEditor, {
          [classes.wysiwygEditorFocused]: wysiwygStatus === 'focused',
        })}
        placeholder={placeholder}
        onBlur={() => {
          setWysiwygStatus('blured')
          onBlur()
        }}
        onFocus={() => setWysiwygStatus('focused')}
        onEditorStateChange={(state) => {
          setEditorState(state)
          onChange({
            contentState: JSON.stringify(
              convertToRaw(state.getCurrentContent())
            ),
          })
        }}
        // toolbarOnFocus
        toolbar={{
          options: [
            'inline',
            'blockType',
            // 'fontSize',
            // 'fontFamily',
            // 'list',
            'textAlign',
            'colorPicker',
            'link',
            // 'embedded',
            'emoji',
            'image',
            'remove',
            'history',
          ],
          image: {
            uploadEnabled: true,
            previewImage: true,
            uploadCallback: uploadImageCallBack,
            alt: { present: true, mandatory: false },
          },
          inline: {
            inDropdown: false,
            options: [
              'bold',
              'italic',
              'underline',
              // 'strikethrough',
              // 'monospace',
              // 'superscript',
              // 'subscript',
            ],
          },
        }}
      />
      {helperText && (
        <Typography color="textSecondary">{helperText}</Typography>
      )}
    </div>
  )
}
