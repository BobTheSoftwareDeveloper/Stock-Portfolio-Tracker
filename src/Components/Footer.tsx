import React from 'react'
import { Paper, Tabs, Tab } from '@material-ui/core'


export default class extends React.Component<any, any> {  
  render() {
    return (
      <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
        <Paper style={{ flexGrow: 1 }}>
          <Tabs
            value={this.props.tab}
            onChange={this.props.changeTab}
            indicatorColor="primary"
            textColor="primary"
            centered
            scrollButtons="auto"
          >
            <Tab label="Home Page" />
            <Tab label="Portfolio" />
            <Tab label="Stock" />
          </Tabs>
        </Paper>
      </div>
    )
  }
}