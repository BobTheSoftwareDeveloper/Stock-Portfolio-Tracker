import React from 'react'
import { Typography, createMuiTheme, Table, Container, Button, Dialog, DialogTitle, DialogContent, DialogContentText,
Select, TextField, TableContainer, TableHead, TableBody, TableRow, TableCell, DialogActions, Paper, MenuItem } from '@material-ui/core'
import { GetStock } from './Utilities/GetStock'
import DeleteDialog from './Dialogs/DeleteDialog'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import Loading from './Loading'

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

const StockPage = () => {
  const [stockArray, setStockArray] = React.useState<StockData>({})
  const [count, setCount] = React.useState<number>(0)
  const [openAdd, setOpenAdd] = React.useState<boolean>(false)
  const [cStockCode, setCStockCode] = React.useState<string>("")
  const [cStockName, setCStockName] = React.useState<string>("")

  const classes = useStyles()

  React.useEffect(() => {
    GetStock().then(res => { setStockArray(res) })
  }, [count])

  const handleClickOpen = () => {
    setOpenAdd(true)
  }

  const handleClickClose = () => {
    setOpenAdd(false)
  }

  const handleStockCode = (event: any) => {
    setCStockCode(event.target.value)
  }

  const handleStockName = (event: any) => {
    setCStockName(event.target.value)
  }

  const handleStockAdd = () => {
    axios
      .post("https://stockportfoliotrackerapi.azurewebsites.net/api/stock",
      {
        stockTicker: cStockCode,
        stockName: cStockName
      })
      .then((res) => {
        if (res.status === 201) {
          alert("New stock added!")
        } else {
          alert("Failed!")
        }
        setCount(count + 1)
      })
      .catch((err) => {console.log(err.response)})
      setOpenAdd(false)
  }

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
              {stockArray[index].stockTicker}
            </TableCell>
            <TableCell align="right">{stockArray[index].stockName}</TableCell>
          </TableRow>
      )
    })

    items = 
    <React.Fragment>
      <Container>
        <Button onClick={handleClickOpen} variant="contained" color="primary" style={{marginTop: theme.spacing(3), marginBottom: theme.spacing(3)}}>Add new stock</Button>
      </Container>
      <Dialog open={openAdd} onClose={handleClickClose} maxWidth="xs">
        <DialogTitle id="form-dialog-title">Add stock</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details below. 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="stockCode"
            label="Stock Code"
            value={cStockCode}
            onChange={handleStockCode}
            fullWidth
          />
          <TextField
            margin="dense"
            id="stockName"
            label="Stock Name"
            value={cStockName}
            onChange={handleStockName}
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
        My Stock
      </Typography>
      {items}
    </React.Fragment>
  )
}

export default StockPage