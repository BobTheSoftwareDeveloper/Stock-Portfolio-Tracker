import React from 'react'
import { Typography, TextField, FormControlLabel, Button, Checkbox, Container, CssBaseline } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginForm() {
  const classes = useStyles();
  const [username, setUsername] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")
  const [authenticated, setAuthenticated] = React.useState<boolean>(
    localStorage.getItem("authenticated") === "true" 
      ? true
      : false 
  )

  const handleTextChange = (event: any) => {
    switch (event.target.id) {
      case 'username':
        setUsername(event.target.value)
        break;
      case 'password':
        setPassword(event.target.value)
        break;
      default:
        console.log("Error: Unable to handle text change.")
    }
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      login(username, password)
    }
  }

  function login(username: string, password: string) {
    // post https://stockportfoliotrackerapi.azurewebsites.net/api/login
    const body = {
      username: username,
      password: password
    }

    //bob
    //MSA2020isCool!
    // attempt to login
    const loginUrl = "https://stockportfoliotrackerapi.azurewebsites.net/api/login"
    fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        if (data[0] === -1) {
          console.log("login failed")
        } else {
          console.log("login success")
          localStorage.setItem("authenticated", "true")
          localStorage.setItem("portfolioList", data)
          alert("login successful")
          window.location.reload(false)
        }
      })
  }

  return ( 
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => login(username, password)}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    </React.Fragment>
  )
}