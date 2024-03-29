import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from 'components/App'
import reportWebVitals from './reportWebVitals'
import { store } from 'store/store'
import { Provider } from 'react-redux'
import 'typeface-ubuntu'
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material'
import theme from 'theme'

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
