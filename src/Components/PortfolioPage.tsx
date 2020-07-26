import React from 'react'
import axios from 'axios'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, 
  Paper, ThemeProvider, createMuiTheme, IconButton, Typography, Button, Container,
Dialog, DialogTitle, DialogContentText, DialogContent, TextField, DialogActions, Select, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EditDialog from './Dialogs/EditDialog'
import { GetStock } from './Utilities/GetStock'
import { Delete } from '@material-ui/icons'
import DeleteDialog from './Dialogs/DeleteDialog'
import Loading from './Loading'

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
  const [portfolioArray, setPortfolioArray] = React.useState<IStatePortfolio>({})
  const [stockArray, setStockArray] = React.useState<IStateStock>({})
  const [count, setCount] = React.useState<number>(0)
  const [openAdd, setOpenAdd] = React.useState<boolean>(false)
  const [currentStockId, setCurrentStockId] = React.useState<number>(1)
  const [currentQuantity, setCurrentQuantity] = React.useState<number>(0)
  const [stockData, setStockData] = React.useState<StockData>({})
  const [portfolioList, setPortfolioList] = React.useState<string | null>(localStorage.getItem("portfolioList"))
  const [check, setCheck] = React.useState<boolean>(false)

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
    const accountId: number = portfolioArray[Number(Object.keys(portfolioArray)[0])].accountId
    axios
      .post("https://stockportfoliotrackerapi.azurewebsites.net/api/portfolio", 
      {
        accountId: Number(accountId),
        quantity: Number(currentQuantity),
        stockId: Number(currentStockId)
      })
      .then((res) => {
        if (res.status === 201) {
          alert("New portfolio added!")
          setCheck(false)
          setCount(count + 1)
        } else {
          alert("Failed!")
        }
        setCount(count + 1)
        setOpenAdd(false)
      })
      .catch((err) => {console.log(err.response)})
  }

  React.useEffect(() => {
    GetStock().then(res => { setStockData(res) })
  }, [])

  React.useEffect(() => {
    axios
      .post("https://stockportfoliotrackerapi.azurewebsites.net/api/login", {
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password")
      })
      .then((res) => {
        var list = ""
        Object.keys(res.data).map((currentValue) => {
          const key = Number(currentValue)
          list += res.data[key] + ","
        })
        setPortfolioList(list)
        localStorage.setItem("portfolioList", list)
        setCheck(true)
      })
      .catch((error) => {console.log(error.response)})
  }, [count])

  React.useEffect(() => {
    var newObj = {}
    axios
      .get("https://stockportfoliotrackerapi.azurewebsites.net/api/portfolio")
      .then(res => {
        Object.keys(res.data).map((currentValue: string, index: number) => {
          newObj = {
            ...newObj,
            [res.data[currentValue].portfolioId]: {
              accountId: res.data[currentValue].accountId,
              quantity: res.data[currentValue].quantity,
              stockId: res.data[currentValue].stockId
            }
          }
        })
        setPortfolioArray(newObj)
      })
  }, [count])

  React.useEffect(() => {
    var newObj = {}
    axios
      .get("https://stockportfoliotrackerapi.azurewebsites.net/api/stock")
      .then(res => {
        Object.keys(res.data).map((currentNum: string, index: number) => {
          newObj = {
            ...newObj,
            [res.data[currentNum].stockId]: {
              stockName: res.data[currentNum].stockName,
              stockTicker: res.data[currentNum].stockTicker
            }
          }
        })
        setStockArray(newObj)
      })
  }, [count])

  var items: any = "";

  // Check all objects are initialized
  if (Object.keys(stockArray).length !== 0 && Object.keys(portfolioArray).length !== 0 && check) {
    // Objects initialized
    const userPortfolio = portfolioList?.split(",")
    var rows: JSX.Element[] = [];

    // structure:
    // StockTicker   |   Quantity    |   Current Price    |    Total Value
    userPortfolio?.forEach((currentValue: string, index: number) => {
      const portId = Number(currentValue)
      if (portfolioArray[portId] === undefined || portfolioArray[portId] === null) {
        return
      }
      const currentPrice: number = 4.32;
      rows.push(
          <TableRow key={currentValue} hover={true}>
            <TableCell component="th" scope="row">
              {stockArray[portfolioArray[portId].stockId].stockTicker}
            </TableCell>
            <TableCell align="right">{portfolioArray[portId].quantity}</TableCell>
            <TableCell align="right">{"$"}{currentPrice}</TableCell>
            <TableCell align="right">{"$"}{Number(currentPrice * portfolioArray[portId].quantity).toFixed(2)}</TableCell>
            <TableCell align="right" size="small">
              <EditDialog portfolioId={portId}
                quantity={portfolioArray[portId].quantity}
                stockId={portfolioArray[portId].stockId}
                accountId={portfolioArray[portId].accountId}
                count={count}
                setCount={setCount}
              />
              {Object.keys(portfolioArray).length <= 1 
                ? <React.Fragment></React.Fragment>
                : <DeleteDialog 
                    source={"portfolio"} 
                    id={portId} 
                    count={count} 
                    setCount={setCount} 
                  />
              }
            </TableCell>
          </TableRow>
      )
    })

    items = 
    <React.Fragment>
      <Container>
        <Button onClick={handleClickOpen} variant="contained" color="primary" style={{marginTop: theme.spacing(3), marginBottom: theme.spacing(3)}}>Add new portfolio</Button>
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
            {Object.keys(stockData).map((currentValue: string) => {
              const index: number = Number(currentValue)
              return (
                <MenuItem value={stockData[index].stockId} key={stockData[index].stockId}>{stockData[index].stockTicker}{" ("}{stockData[index].stockName}{")"}</MenuItem>
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