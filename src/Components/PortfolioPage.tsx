import React from 'react'
import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
  Paper, ThemeProvider, createMuiTheme, IconButton, Typography, Button, Container,
  Dialog, DialogTitle, DialogContentText, DialogContent, TextField, DialogActions, Select, MenuItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EditDialog from './Dialogs/EditDialog'
import { Delete } from '@material-ui/icons'
import { useCookies } from 'react-cookie'
import DeleteDialog from './Dialogs/DeleteDialog'
import Loading from './Loading'
import PortfolioAPI from './Utilities/PortfolioAPI'
import StockAPI from './Utilities/StockAPI'
import CheckLogin from './Utilities/CheckLogin'

interface IStatePortfolio {
  [portfolioId: number]: {
    accountId: number
    quantity: number,
    stockId: number
  }
}

interface IStateStock {
  [stockId: number]: {
    stockName: string,
    stockTicker: string
  }
}

interface StockData {
  [index: number]: {
    stockId: number,
    stockName: string,
    stockTicker: string
  }
}

const theme = createMuiTheme();
const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
  container: {
    marginTop: theme.spacing(2),
    width: "97%",
    textAlign: "center",
    marginBottom: theme.spacing(10),
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 800
  }
});

const PortfolioPage = () => {
  const classes = useStyles();
  const [portfolioArray, setPortfolioArray] = React.useState<any>({})
  const [stockArray, setStockArray] = React.useState<any>({})
  const [count, setCount] = React.useState<number>(0)
  const [openAdd, setOpenAdd] = React.useState<boolean>(false)
  const [currentStockId, setCurrentStockId] = React.useState<string>("AIR")
  const [currentQuantity, setCurrentQuantity] = React.useState<number>(0)
  const [check, setCheck] = React.useState<boolean>(false)
  const [cookies, setCookie, removeCookie] = useCookies(['SESSION_ID'])

  const handleClickOpen = () => {
    setOpenAdd(true)
  }

  const handleClickClose = () => {
    setOpenAdd(false)
  }

  const handleQuantityChange = (event: any) => [
    setCurrentQuantity(event.target.value)
  ]

  const handleSelect = (event: any) => {
    setCurrentStockId(event.target.value)
  }

  const handleStockAdd = () => {
    PortfolioAPI.add(cookies["SESSION_ID"], currentQuantity, currentStockId)
      .then(response => {
        alert("New portfolio added!")
        setCheck(false)
        setCount(count + 1)
        setOpenAdd(false)
      })
      .catch(err => {
        alert("Error: " + err)
      })
  }

  React.useEffect(() => {
    CheckLogin.CheckLogin(cookies["SESSION_ID"])
      .then(response => { })
      .catch(err => {
        removeCookie("SESSION_ID")
        window.location.href = "/"
      })
  }, [])

  React.useEffect(() => {
    PortfolioAPI.get(cookies["SESSION_ID"])
      .then(response => {
        setPortfolioArray(response)
        setCheck(true)
      })
      .catch(err => {
        alert("Error: " + err)
      })
  }, [count])

  React.useEffect(() => {
    StockAPI.get(cookies["SESSION_ID"])
      .then(response => {
        setStockArray(response)
      })
      .catch(err => {
        alert("Error: " + err)
      })
  }, [count])

  var items: any = "";

  // Check all objects are initialized
  if (Object.keys(stockArray).length !== 0 && check) {
    // Objects initialized
    var rows: JSX.Element[] = [];

    // structure:
    // StockTicker   |   Quantity    |   Current Price    |    Total Value
    portfolioArray.forEach((currentValue: any, index: number) => {
      rows.push(
        <TableRow key={currentValue.id} hover={true}>
          <TableCell component="th" scope="row">
            {currentValue.stock_ticker}
          </TableCell>
          <TableCell align="right">{currentValue.quantity}</TableCell>
          <TableCell align="right">{"$"}{currentValue.price}</TableCell>
          <TableCell align="right">{"$"}{Number(currentValue.price * currentValue.quantity).toFixed(2)}</TableCell>
          <TableCell align="right" size="small">
            <EditDialog
              sessionId={cookies["SESSION_ID"]}
              portfolioId={currentValue.id}
              quantity={currentValue.quantity}
              stockId={currentValue.stock_ticker}
              currentStockData={stockArray}
              count={count}
              setCount={setCount}
            />
            <DeleteDialog
              sessionId={cookies["SESSION_ID"]}
              source={"portfolio"}
              id={currentValue.id}
              count={count}
              setCount={setCount}
            />
          </TableCell>
        </TableRow>
      )
    })

    items =
      <React.Fragment>
        <Container>
          <Button onClick={handleClickOpen} variant="contained" color="primary" style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(3) }}>Add new portfolio</Button>
        </Container>
        <Dialog open={openAdd} onClose={handleClickClose} maxWidth="xs">
          <DialogTitle id="form-dialog-title">Add portfolio</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill in the details below.
          </DialogContentText>
            <Typography variant="body1">
              Stock Code
          </Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currentStockId}
              onChange={handleSelect}
              fullWidth
            >
              {stockArray.map((currentValue: any) => {
                return (
                  <MenuItem value={currentValue.ticker} key={currentValue.id}>{currentValue.ticker}{" ("}{currentValue.name}{")"}</MenuItem>
                )
              })}
            </Select>
            <TextField
              autoFocus
              margin="dense"
              id="quantity"
              label="Quantity"
              value={currentQuantity}
              onChange={handleQuantityChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleStockAdd} color="primary">
              Add
          </Button>
          </DialogActions>
        </Dialog>
        <TableContainer component={Paper} className={classes.container}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead style={{ backgroundColor: "rgb(159 164 169 / 53%)" }}>
              <TableRow>
                <TableCell>Stock Code</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Current Price</TableCell>
                <TableCell align="right">Total Value</TableCell>
                <TableCell align="right" size="small">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows}
            </TableBody>
          </Table>
        </TableContainer>
      </React.Fragment>
  } else {
    items =
      <React.Fragment>
        <br /><Loading />
      </React.Fragment>

  }

  return (
    <React.Fragment>
      <Typography component="h1" variant="h5" style={{ marginTop: theme.spacing(2), fontWeight: 600 }}>
        My Portfolio
      </Typography>
      {items}
    </React.Fragment>
  )
}

export default PortfolioPage