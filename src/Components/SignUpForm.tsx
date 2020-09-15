import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography, TextField, Button } from '@material-ui/core'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  layout: {
    width: '90vw',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(500 + theme.spacing(2) * 2)]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
    [theme.breakpoints.up(500 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      padding: theme.spacing(10),
    },
  },
  sectionHeading: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

interface SignUp {
  closeSignUp: any
}

const SignUpForm = (props: any) => {
  const classes = useStyles()
  const [username, setUsername] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")
  const [email, setEmail] = React.useState<string>("")

  const signup = (event: any) => {
    if (event !== null && event !== undefined) {
      event.preventDefault()
    }

    if (username.trim() === "" || password.trim() === "" || email.trim() === "") {
      alert("Please fill in all the fields.")
      return
    }

    const url: string = process.env.REACT_APP_BACKEND_URL + "api/create-account"
    axios.post(url, { username: username, password: password, email: email })
      .then(response => {
        if (response.status === 200) {
          alert(response.data.status)
        } else {
          alert("Sign up failed. Please try again.")
        }
        props.closeSignUp()
      })
      .catch(err => {
        console.log("Error:", err)
        props.closeSignUp()
      })
  }

  const handleTextChange = (event: any) => {
    const value = event.target.value
    switch (event.target.id) {
      case 'username':
        setUsername(value)
        break;
      case 'password':
        setPassword(value)
        break;
      case 'email':
        setEmail(value)
        break;
      default:
        console.log("Error: Unable to handle text change.")
    }
  }

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={handleTextChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={handleTextChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleTextChange}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signup}
          >
            Create Account
          </Button>
        </form>
      </Paper>
    </main>
  )
}

export default SignUpForm