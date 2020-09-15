import React from 'react'
import { Paper, Tabs, Tab } from '@material-ui/core'

interface IFooter {
  tab: number,
  setTab: any
}

const Footer = (props: IFooter) => {
  return (
    <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
      <Paper style={{ flexGrow: 1 }}>
        <Tabs
          value={props.tab}
          onChange={props.setTab}
          indicatorColor="primary"
          textColor="primary"
          centered
          scrollButtons="auto"
        >
          <Tab label="Home" />
          <Tab label="Portfolio" />
          <Tab label="Stock" />
          <Tab label="Settings" />
        </Tabs>
      </Paper>
    </div>
  )
}

export default Footer