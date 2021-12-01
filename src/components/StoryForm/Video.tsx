import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  FormLabel,
} from '@mui/material'
import React, { ReactNode } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { StoryState, Video as VideoType } from 'store/slices/story'
import useFormContext from 'hooks/useFormContext'
import handleVideoInput from 'utils/handleVideoInput'
import media from 'utils/getMediaPath'
interface Props extends UseControllerProps<StoryState> {
  label: string
  helperText?: string | ReactNode
}

export default function Video({ label, helperText, ...props }: Props) {
  const { control } = useFormContext()
  const [showDialog, setShowDialog] = React.useState(false)
  const [url, setUrl] = React.useState<string>('')
  const { field } = useController({ control, ...props })
  const videoSrc =
    (field.value as VideoType) &&
    ((field.value as VideoType).path
      ? `file://${media((field.value as VideoType).path)}`
      : (field.value as VideoType).url)
  return (
    <FormControl>
      <FormControlLabel
        control={
          <Button
            variant="contained"
            component="label"
            style={{ marginLeft: 12, marginRight: 12 }}
            onClick={() => setShowDialog(true)}
          >
            {field.value ? 'Change Video' : 'Choose Video'}
          </Button>
        }
        label={label}
      />
      <Dialog
        open={showDialog}
        onClose={() => {
          setUrl('')
          setShowDialog(false)
        }}
      >
        <DialogTitle>Add a video</DialogTitle>
        <DialogContent>
          <Box my={4}>
            <Box>
              <div>
                <Button variant="contained" component="label">
                  From Computer
                  <input
                    type="file"
                    accept="video/mp4, video/webm, video/ogg"
                    hidden
                    onChange={async (e) => {
                      if (e?.target?.files && e.target.files.length > 0) {
                        let res = await handleVideoInput(e.target.files[0])
                        field.onChange(res)
                        setShowDialog(false)
                        setUrl('')
                      }
                    }}
                  />
                </Button>
              </div>
            </Box>
            <Box my={4}>
              <FormLabel>Or</FormLabel>
            </Box>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                field.onChange({ url })
                setShowDialog(false)
                setUrl('')
              }}
            >
              <Box display="flex" alignItems="end">
                <TextField
                  label="with a Link"
                  variant="outlined"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value)
                  }}
                />
                <Box ml={2}>
                  <Button variant="contained" type="submit">
                    Ok
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {field.value && (
        <Box mt={2}>
          <video width="320" height="240" controls key={videoSrc}>
            <source src={videoSrc} type={'video/mp4'} />
            Your browser does not support the video tag.
          </video>
        </Box>
      )}
    </FormControl>
  )
}
