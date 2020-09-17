import React from 'react'
import { IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Button, DialogActions, Select, MenuItem, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Delete, Edit } from '@material-ui/icons'
import axios from 'axios'
import { Autocomplete } from '@material-ui/lab'
import PortfolioAPI from '../Utilities/PortfolioAPI'

interface Edit {
  sessionId: string,
  portfolioId: number,
  quantity: number,
  stockId: string,
  socket: any,
  currentStockData: any
}

const EditDialog = ({ sessionId, portfolioId, quantity, stockId, socket, currentStockData }: Edit) => {
  const [openEdit, setOpenEdit] = React.useState<boolean>(false)
  const [stockData, setStockData] = React.useState<any>(currentStockData)
  const [currentStockId, setCurrentStockId] = React.useState<string>("")
  const [currentQuantity, setCurrentQuantity] = React.useState<number>(quantity)

  const handleOpen = () => {
    setOpenEdit(true);
  }

  const handleClose = () => {
    setOpenEdit(false)
  }

  const handleSelect = (event: any, value: any) => {
    if (value === undefined || value === null) {
      return 
    }
    const code = value.split(" ")[0].trim()
    setCurrentStockId(code)
  }

  const handleEditData = () => {
    if (currentStockId.trim() === "") {
      alert("Please enter the stock code")
      return
    }
    if (currentQuantity === 0) {
      alert("Quantity cannot be zero")
      return
    }
    PortfolioAPI.update(sessionId, portfolioId, currentQuantity, currentStockId)
      .then(response => {
        alert("Successfully edited!")
        socket.emit("update", sessionId)
        setOpenEdit(false)
      })
      .catch(err => {
        alert("Error: " + err)
      })
  }

  const handleQuantityChange = (event: any) => {
    setCurrentQuantity(event.target.value)
  }

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
          <Autocomplete
            options={stockData.map((currentValue: any) => currentValue.ticker + " (" + currentValue.name + ")")}
            onChange={handleSelect}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="" fullWidth required />
            )}
          />
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