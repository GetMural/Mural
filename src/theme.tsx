import { indigo } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      ...indigo,
      500: '#343866',
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '2rem',
    },
  },
})

export default theme
