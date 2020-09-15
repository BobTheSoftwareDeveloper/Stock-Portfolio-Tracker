import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { CookiesProvider } from 'react-cookie'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F38D50'
    },
    secondary: {
      main: '#D74061'
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
