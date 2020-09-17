import React from 'react'
import {
  Typography, createMuiTheme, Button, Dialog, DialogTitle,
  TextField, Paper, MenuItem, Theme, Grid, Backdrop, CircularProgress
} from '@material-ui/core'
import DeleteDialog from './Dialogs/DeleteDialog'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import Loading from './Loading'
import { useCookies } from 'react-cookie'
import QRCode from 'qrcode'
import CheckLogin from './Utilities/CheckLogin'

interface StockData {
  [index: number]: {
    id: number,
    name: string,
    ticker: string
  }
}

const theme = createMuiTheme();
const useStyles = makeStyles((theme: Theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
    [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      padding: theme.spacing(10),
    },
  },
  sectionHeading: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

const Settings = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['SESSION_ID'])
  const [open, setOpen] = React.useState<boolean>(false)
  const [qrCodeImage, setQrCodeImage] = React.useState<any>()
  const [totpCode, setTotpCode] = React.useState<string>("")
  const [backDropOpen, setBackDropOpen] = React.useState<boolean>(false)
  const [verifiedStatus, setVerifiedStatus] = React.useState<boolean>(false)
  const [count, setCount] = React.useState<number>(0)

  React.useEffect(() => {
    CheckLogin.CheckLogin(cookies["SESSION_ID"])
      .then(response => { })
      .catch(err => {
        removeCookie("SESSION_ID")
        window.location.href = "/"
      })
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  const handleCode = (event: any) => {
    setTotpCode(event.target.value)
  }

  const disableTotp = () => {
    axios.post(process.env.REACT_APP_BACKEND_URL + "api/disable-totp", {
      session_id: cookies["SESSION_ID"]
    })
      .then(response => {
        alert("TOTP disabled!")
        setCount(count + 1)
      })
      .catch(err => {
        alert("Error: " + err)
      })
  }

  React.useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + "api/get-totp-status", {
      params: {
        session_id: cookies["SESSION_ID"]
      }
    })
      .then(response => {
        const text = response.data

        if (text === "verified") {
          setVerifiedStatus(true)
        } else {
          setVerifiedStatus(false)
        }
      })
  }, [count])

  const handleVerify = () => {
    axios.post(process.env.REACT_APP_BACKEND_URL + "api/verify-totp", { session_id: cookies["SESSION_ID"], code: totpCode.replace(" ", "") })
      .then(response => {
        const responseText = response.data
        if (responseText === "Valid") {
          alert("TOTP validted!")
          setOpen(false)
          setCount(count + 1)
        } else {
          alert("Invaid TOTP code. Try again.")
        }
      })
      .catch(err => {
        alert("Error: " + err)
      })
  }

  const generateQrCode = () => {
    setBackDropOpen(true)
    axios.get(process.env.REACT_APP_BACKEND_URL + "api/generate-totp", {
      params: {
        session_id: cookies["SESSION_ID"]
      }
    })
      .then(response => {
        const totp: string = response.data
        QRCode.toDataURL(totp, function (err, imageData) {
          if (err) {
            alert(err)
            setBackDropOpen(false)
            return
          }
          setQrCodeImage(<img style={{
            width: '50vw', height: '50vw', display: 'block',
            marginLeft: 'auto', marginRight: 'auto', maxWidth: 250, maxHeight: 250
          }} src={`${imageData}`}></img>)
          setBackDropOpen(false)
          setOpen(true)
        })
      })
      .catch(err => {
        alert("Error: " + err)
      })
  }

  const classes = useStyles()

  return (
    <React.Fragment>
      <Typography component="h1" variant="h5" style={{ marginTop: theme.spacing(2), fontWeight: 600 }}>
        Settings
      </Typography>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Grid container spacing={3} style={{ marginTop: 20 }}>
            {/* <Grid item xs={12} sm={6}>
              <Typography variant="body1" align="center" style={{ fontWeight: 600, marginBottom: 20 }}>
                Change Password:
              </Typography>
              <TextField
                required
                style={{ marginTop: 20 }}
                id="currentPassword"
                name="currentPassword"
                type="password"
                label="Current Password"
                fullWidth
              />
              <TextField
                required
                style={{ marginTop: 20 }}
                id="newPassword"
                name="newPassword"
                type="password"
                label="New Password"
                fullWidth
              />
              <TextField
                required
                style={{ marginTop: 20 }}
                id="newPasswordConfirm"
                name="newPasswordConfirm"
                type="password"
                label="Confirm New Password"
                fullWidth
              />
              <Button variant="contained" color="primary" style={{ marginTop: 20 }}>
                Update Password
              </Button>
            </Grid> */}
            <Grid item xs={12} sm={12} style={{ textAlign: 'center' }}>
              <Typography variant="body1" align="center" style={{ fontWeight: 600, marginBottom: 20 }}>
                Two-Factor Authentication:
              </Typography>
              {verifiedStatus === false ?
                <>
                  <Typography variant="body1">TOTP is <Typography variant="body1" component="span" style={{ color: 'red' }}>disabled</Typography></Typography>
                  <Button variant="contained" color="primary" onClick={generateQrCode} style={{ marginTop: 20 }}>
                    Enable TOTP
                  </Button>
                </>
                :
                <>
                  <Typography variant="body1">TOTP is <Typography variant="body1" component="span" style={{ color: 'green' }}>enabled</Typography></Typography>
                  <Button variant="contained" color="primary" onClick={disableTotp} style={{ marginTop: 20 }}>
                    Disable TOTP
                  </Button>
                </>
              }
            </Grid>
          </Grid>
        </Paper>
      </main>
      <Dialog onClose={handleClose} open={open}>
        <div style={{ padding: '16px 24px', textAlign: 'center' }}>
          <DialogTitle style={{ padding: 0 }}>Enable TOTP</DialogTitle>
          <Typography variant="body1">Please scan the QR code below with an authenticator app:</Typography>
          {qrCodeImage}
          <TextField
            variant="outlined"
            label="Code"
            value={totpCode}
            onChange={handleCode}
            fullWidth
            placeholder="Enter your TOTP code here"
          />
          <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={handleVerify}>Verify</Button>
        </div>
      </Dialog>
      <Backdrop className={classes.backdrop} open={backDropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  )
}

export default Settings