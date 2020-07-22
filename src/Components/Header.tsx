import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import { Menu } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flex: 1,
      textAlign: 'left'
    },
  }),
);

export default function Header() {
  function handleButtonClick() {
    const authenticated = localStorage.getItem("authenticated")
    if (authenticated === "true") {
      localStorage.clear()
      window.location.reload(false);
    }
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography component="h1" variant="h6" className={classes.title}>
            Stock Portfolio Tracker
          </Typography>
          <Button color="inherit" onClick={handleButtonClick}>
            {localStorage.getItem("authenticated") === "true" ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}