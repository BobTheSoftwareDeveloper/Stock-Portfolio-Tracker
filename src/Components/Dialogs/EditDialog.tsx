import React from 'react'
import { IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Button, DialogActions, Select, MenuItem, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Delete, Edit } from '@material-ui/icons'
import axios from 'axios'

interface Edit {
  portfolioId: number,
  quantity: number,
  stockId: number,
  accountId: number,
  count: number,
  setCount: any
}

interface StockData {
  [index: number]: {
    stockId: number,
    stockName: string,
    stockTicker: string
  }
}

const EditDialog = ({ portfolioId, quantity, stockId, accountId, count, setCount }: Edit) => {
  const [openEdit, setOpenEdit] = React.useState<boolean>(false)
  const [stockData, setStockData] = React.useState<StockData>({})
  const [currentStockId, setCurrentStockId] = React.useState<number>(stockId)
  const [currentQuantity, setCurrentQuantity] = React.useState<number>(quantity)

  const handleOpen = () => {
    setOpenEdit(true);
  }

  const handleClose = () => {
    setOpenEdit(false)
  }

  const handleSelect = (event: any) => {
    setCurrentStockId(event.target.value)
  }

  const handleEditData = () => {
    axios
      .put(
        "https://stockportfoliotrackerapi.azurewebsites.net/api/portfolio/" + portfolioId.toString(),
        {
          portfolioId: portfolioId,
          quantity: Number(currentQuantity),
          stockId: currentStockId,
          accountId: accountId
        }
      )
      .then((res) => {
        alert("Successfully edited!")
        setCount(count + 1)
        setOpenEdit(false)
      })
      .catch((r) => console.log(r.response))
  }

  const handleQuantityChange = (event: any) => [
    setCurrentQuantity(event.target.value)
  ]

  React.useEffect(() => {
    // TODO
  }, [])

  return (
    <React.Fragment>
      <IconButton color="primary" component="span" onClick={handleOpen}>
        <Edit />
      </IconButton>
      <Dialog open={openEdit} onClose={handleClose} maxWidth="xs">
        <DialogTitle id="form-dialog-title">Edit Portfolio</DialogTitle>
        <DialogContent>
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
          <Button onClick={handleEditData} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default EditDialog