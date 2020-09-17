import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import { useCookies } from 'react-cookie'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      display: 'inline-block',
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
          {/* <Typography component="h1" variant="h6" className={classes.title}>
            Stock Portfolio Tracker
          </Typography> */}
          <div style={{ height: '100%' }}>
            <img src="/logo.png" alt="Logo" className={classes.title} style={{ width: 230, height: '100%' }}></img>
          </div>
          <div style={{ flex: 1 }}></div>
          <Button color="secondary" variant="contained" onClick={handleButtonClick}>
            {cookies["SESSION_ID"] !== undefined ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}