import React from 'react'
import { Typography, createMuiTheme, Table, Container, Button, Dialog, DialogTitle, DialogContent, DialogContentText,
Select, TextField, TableContainer, TableHead, TableBody, TableRow, TableCell, DialogActions, Paper, MenuItem } from '@material-ui/core'
import DeleteDialog from './Dialogs/DeleteDialog'
import { makeStyles } from '@material-ui/core/styles'
import Loading from './Loading'
import { useCookies } from 'react-cookie'
import StockAPI from './Utilities/StockAPI'

interface StockData {
  [index: number]: {
    id: number,
    name: string,
    ticker: string
  }
}

const theme = createMuiTheme();
const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
  container: {
    marginTop: theme.spacing(10),
    width: "97%",
    textAlign: "center",
    marginBottom: theme.spacing(10),
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 800,
  }
});

const StockPage = () => {
  const [stockArray, setStockArray] = React.useState<StockData>({})
  const [count, setCount] = React.useState<number>(0)
  const [openAdd, setOpenAdd] = React.useState<boolean>(false)
  const [cStockCode, setCStockCode] = React.useState<string>("")
  const [cStockName, setCStockName] = React.useState<string>("")
  const [cookies, setCookie, removeCookie] = useCookies(['SESSION_ID'])

  const classes = useStyles()

  React.useEffect(() => {
    StockAPI.get(cookies["SESSION_ID"])
      .then(data => {
        setStockArray(data)
      })
      .catch(err => {
        alert("Error: " + err)
      })
  }, [count])

  var items: any = "";

  // Check all objects are initialized
  if (Object.keys(stockArray).length) {

    // Objects initialized
    const userStock = Object.keys(stockArray)
    var rows: JSX.Element[] = [];

    // structure:
    // Stock Ticker   |   Stock Name    |   Action
    userStock.forEach((currentValue: string) => {
      const index = Number(currentValue)

      rows.push(
          <TableRow key={currentValue} hover={true}>
            <TableCell component="th" scope="row">
              {stockArray[index].ticker}
            </TableCell>
            <TableCell align="right">{stockArray[index].name}</TableCell>
          </TableRow>
      )
    })

    items = 
    <React.Fragment>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead style={{ backgroundColor: "rgb(159 164 169 / 53%)" }}>
            <TableRow>
              <TableCell>Stock Code</TableCell>
              <TableCell align="right">Stock Name</TableCell>
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
        <br />
        <Loading />
      </React.Fragment>
    
  }

  return (
    <React.Fragment>
      <Typography component="h1" variant="h5" style={{ marginTop: theme.spacing(2), fontWeight: 600 }}>
        All Stocks
      </Typography>
      {items}
    </React.Fragment>
  )
}

export default StockPage