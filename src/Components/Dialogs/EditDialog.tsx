import React from 'react'
import { IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Button, DialogActions, Select, MenuItem, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Delete, Edit } from '@material-ui/icons'
import axios from 'axios'
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
  const [currentStockId, setCurrentStockId] = React.useState<string>(stockId)
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
            {stockData.map((currentValue: any) => {
              const index: number = Number(currentValue)
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
          <Button onClick={handleEditData} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default EditDialog