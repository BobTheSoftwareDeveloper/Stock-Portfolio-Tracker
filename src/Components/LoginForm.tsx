

// const LoginForm = ({ portfolio: string, portfolioUpdate: any }) => {
//   const classes = useStyles();
//     const [username, setUsername] = React.useState<string>("")
//     const [password, setPassword] = React.useState<string>("")
//     // const [portfolioState, setPortfolioState] = React.useState<string>("")
//     // const [authenticated, setAuthenticated] = React.useState<boolean>(
//     //   localStorage.getItem("authenticated") === "true" 
//     //     ? true
//     //     : false 
//     // )

//     const handlePortfolioUpdate = (data: string) => {
//       this.props.portfolioUpdate(data)
//     }

//     const handleTextChange = (event: any) => {
//       switch (event.target.id) {
//         case 'username':
//           setUsername(event.target.value)
//           break;
//         case 'password':
//           setPassword(event.target.value)
//           break;
//         default:
//           console.log("Error: Unable to handle text change.")
//       }
//     }

//     const handleKeyDown = (event: any) => {
//       if (event.key === 'Enter') {
//         login(username, password)
//       }
//     }

//     function login(username: string, password: string) {
//       // post https://stockportfoliotrackerapi.azurewebsites.net/api/login
//       const body = {
//         username: username,
//         password: password
//       }

//       //bob
//       //MSA2020isCool!
//       // attempt to login
//       const loginUrl = "https://stockportfoliotrackerapi.azurewebsites.net/api/login"
//       fetch(loginUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'text/json'
//         },
//         body: JSON.stringify(body)
//       })
//         .then(response => response.json())
//         .then(data => {
//           if (data[0] === -1) {
//             console.log("login failed")
//           } else {
//             console.log("login success")
//             localStorage.setItem("authenticated", "true")
//             handlePortfolioUpdate(data);
//             console.log("data:", data)
//             // localStorage.setItem("portfolioList", data)
//             alert("login successful")
//             window.location.reload(false)
//           }
//         })
//     }

//     return ( 
//       <React.Fragment>
//         <Container component="main" maxWidth="xs">
//           <CssBaseline />
//           <div className={classes.paper}>
//             <Typography component="h1" variant="h5">
//               Sign in
//             </Typography>
//             <form className={classes.form} noValidate>
//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="username"
//                 label="Username"
//                 name="username"
//                 autoComplete="username"
//                 autoFocus
//                 onChange={handleTextChange}
//                 onKeyDown={handleKeyDown}
//               />
//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//                 onChange={handleTextChange}
//                 onKeyDown={handleKeyDown}
//               />
//               <Button
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 className={classes.submit}
//                 onClick={() => login(username, password)}
//               >
//                 Sign In
//               </Button>
//             </form>
//           </div>
//         </Container>
//       </React.Fragment>
//     )
//   }


// export default LoginForm

import React from 'react'
import { Typography, TextField, FormControlLabel, Button, Checkbox, Container, CssBaseline, withStyles, createStyles, createMuiTheme } from '@material-ui/core'
// import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import PortfolioPage from './PortfolioPage';

const theme = createMuiTheme();
const style = createStyles({
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
  password: string
}

class LoginForm extends React.Component<any, IState> {
  constructor(props: any) {
    super(props)
    this.state = ({
      username: "",
      password: ""
    })
  }

  render () {
    // const [portfolioState, setPortfolioState] = React.useState<string>("")
    // const [authenticated, setAuthenticated] = React.useState<boolean>(
    //   localStorage.getItem("authenticated") === "true" 
    //     ? true
    //     : false 
    // )
    const { classes } = this.props

    const handleTextChange = (event: any) => {
      switch (event.target.id) {
        case 'username':
          this.setState({
            username: event.target.value
          })
          break;
        case 'password':
          this.setState({
            password: event.target.value
          })
          break;
        default:
          console.log("Error: Unable to handle text change.")
      }
    }

    const handleKeyDown = (event: any) => {
      if (event.key === 'Enter') {
        login(this.state.username, this.state.password)
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
                onClick={() => login(this.state.username, this.state.password)}
              >
                Sign In
              </Button>
            </form>
          </div>
        </Container>
      </React.Fragment>
    )
  }
}

export default withStyles(style)(LoginForm)