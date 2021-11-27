import SaveAsIcon from '@mui/icons-material/SaveAltSharp'
import { Button } from '@mui/material'
import useSaveAs from 'hooks/useSaveAs'

export default function SaveAsButton() {
  const saveAs = useSaveAs()

  return (
    <Button
      startIcon={<SaveAsIcon />}
      onClick={saveAs}
      variant="contained"
      color="secondary"
    >
      Save as
    </Button>
  )
}
