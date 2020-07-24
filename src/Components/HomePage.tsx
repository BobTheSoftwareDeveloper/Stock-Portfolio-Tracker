import React from 'react'
import { Typography, createMuiTheme } from '@material-ui/core'


const theme = createMuiTheme();

export default class StockPage extends React.Component<any, any> {
  render () {
    return (
      <Typography component="h1" variant="h5" style={{ marginTop: theme.spacing(2), fontWeight: 600 }}>
        Portfolio Overview
      </Typography>
    )
  }
}