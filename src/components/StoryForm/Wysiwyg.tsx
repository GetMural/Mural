import { Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { ReactNode } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { RichText, StoryState } from 'store/slices/story'
import useFormContext from 'hooks/useFormContext'
import { Editor } from 'react-draft-wysiwyg'
import React from 'react'
import clsx from 'clsx'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import handleImageInput from 'utils/handleImageInput'
import media from 'utils/getMediaPath'

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

  React.useEffect(() => {
    if (value && (value as unknown as RichText).contentState) {
      let temp = convertFromRaw(
        JSON.parse((value as unknown as RichText).contentState)
      )
      setEditorState(EditorState.createWithContent(temp))
    }
    // we only need value for the defaultValue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function uploadImageCallBack(file: File) {
    const location = await handleImageInput(file)
    return {
      data: {
        link: 'file:///' + media(location.big.path),
      },
    }
  }

  return (
    <div>
      <Typography gutterBottom>{label}</Typography>
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
            'embedded',
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
