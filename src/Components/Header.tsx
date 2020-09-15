import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { useCookies } from 'react-cookie'

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

  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies(['SESSION_ID'])

  function handleButtonClick() {
    const session_id = cookies["SESSION_ID"]
    if (session_id !== undefined) {
      removeCookie("SESSION_ID")
      window.location.reload(false);
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography component="h1" variant="h6" className={classes.title}>
            Stock Portfolio Tracker
          </Typography>
          <Button color="inherit" onClick={handleButtonClick}>
            {cookies["SESSION_ID"] !== undefined ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}