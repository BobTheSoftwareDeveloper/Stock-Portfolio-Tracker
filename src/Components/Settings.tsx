import React from 'react'
import {
  Typography, createMuiTheme, Table, Container, Button, Dialog, DialogTitle, DialogContent, DialogContentText,
  Select, TextField, TableContainer, TableHead, TableBody, TableRow, TableCell, DialogActions, Paper, MenuItem, Theme, Grid
} from '@material-ui/core'
import DeleteDialog from './Dialogs/DeleteDialog'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import Loading from './Loading'
import { useCookies } from 'react-cookie'

interface StockData {
  [index: number]: {
    id: number,
    name: string,
    ticker: string
  }
}

const theme = createMuiTheme();
const useStyles = makeStyles((theme: Theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
    [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      padding: theme.spacing(10),
    },
  },
  sectionHeading: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

const Settings = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['SESSION_ID'])

  const classes = useStyles()

  return (
    <React.Fragment>
      <Typography component="h1" variant="h5" style={{ marginTop: theme.spacing(2), fontWeight: 600 }}>
        Settings
      </Typography>
    </React.Fragment>
  )
}

export default Settings