import React from 'react'
import { Paper, Tabs, Tab } from '@material-ui/core'


export default class extends React.Component<any, any> {  
  render() {
    return (
      <Paper style={{ flexGrow: 1 }}>
        <Tabs
          value={this.props.tab}
          onChange={this.props.changeTab}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Home Page" />
          <Tab label="Portfolio" />
          <Tab label="Stock" />
        </Tabs>
      </Paper>
    )
  }
}