import React from 'react'
import {
  Typography, TextField, FormControlLabel, Button,
  Checkbox, Container, CssBaseline, withStyles,
  createStyles, createMuiTheme, CircularProgress, Backdrop
} from '@material-ui/core'
import PortfolioPage from './PortfolioPage';
import SignUpForm from './SignUpForm'
import { useCookies } from 'react-cookie'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

const theme = createMuiTheme();
const style = makeStyles({
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
});

interface IState {
  username: string,
  password: string,
  open: boolean,
  signUpOpen: boolean
}

const LoginForm = () => {
  const [username, setUsername] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")
  const [totp, setTotp] = React.useState<string>("")
  const [open, setOpen] = React.useState<boolean>(false)
  const [signUpOpen, setSignUpOpen] = React.useState<boolean>(false)
  const [cookies, setCookie, removeCookie] = useCookies(['SESSION_ID'])
  const classes = style()

  const handleBackdropToggle = () => {
    setOpen(!open)
  }

  const handleTextChange = (event: any) => {
    switch (event.target.id) {
      case 'username':
        setUsername(event.target.value)
        break
      case 'password':
        setPassword(event.target.value)
        break
      case 'totp':
        setTotp(event.target.value)
        break
      default:
        console.log("Error: Unable to handle text change.")
    }
  }

  const signUp = () => {
    setSignUpOpen(true)
  }

  const closeSignUp = () => {
    setSignUpOpen(false)
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      login(username, password, totp)
    }
  }

  const login = (username: string, password: string, totp: string) => {
    handleBackdropToggle()
    const body = {
      username: username,
      password: password,
      totp: totp.replace(" ", "")
    }

    const loginUrl = process.env.REACT_APP_BACKEND_URL + "api/login"
    axios.post(loginUrl, body)
      .then(response => {
        console.log(response)

        if (response.data === "verify totp") {
          alert("need to verify")
          setOpen(false)
        } else {
          const session_id = response.data.session_id
          const expire = new Date(Date.parse(response.data.expire))
          setCookie("SESSION_ID", session_id, { path: '/', expires: expire})
          window.location.reload(true)
        }
      })
      .catch(err => {
        alert("Invalid login details")
        setOpen(false)
        setSignUpOpen(false)
      })
  }

  return (
    <React.Fragment>
      <Backdrop
        open={open}
        style={{ zIndex: theme.zIndex.drawer + 1, color: '#fff' }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Backdrop
        open={signUpOpen}
        style={{ zIndex: theme.zIndex.drawer + 1, color: '#fff' }}
      >
        <SignUpForm closeSignUp={closeSignUp} />
      </Backdrop>
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
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="totp"
              label="TOTP Code"
              id="totp"
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => login(username, password, totp)}
            >
              Sign In
              </Button>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              style={{ marginTop: 30 }}
              onClick={signUp}
            >
              Sign Up
              </Button>
          </form>
        </div>
      </Container>
    </React.Fragment>
  )
}

export default LoginForm