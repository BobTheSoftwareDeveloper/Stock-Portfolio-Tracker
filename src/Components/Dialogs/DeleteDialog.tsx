import React from 'react'
import { IconButton, Dialog, DialogTitle, DialogActions, Button, Typography } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import axios from 'axios'
import PortfolioAPI from '../Utilities/PortfolioAPI'

interface Items {
  sessionId: string,
  source: string,
  id: number,
  socket: any
}

const DeleteDialog = ({ sessionId, source, id, socket }: Items) => {
  const [open, setOpen] = React.useState<boolean>(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const deleteItem = () => {
    PortfolioAPI.remove(sessionId, id)
      .then(response => {
        alert("Successfully deleted!")
        socket.emit("update", sessionId)
      })
      .catch(err => {
        alert("Error: " + err)
      })
  }

  return (
    <React.Fragment>
        <IconButton color="secondary" component="span" onClick={handleOpen}>
          <Delete />
        </IconButton>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>
            <Typography variant="body1" style={{fontWeight: 700}}>
              Are you sure you want to delete this item?
            </Typography>
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              No
            </Button>
            <Button onClick={deleteItem} color="secondary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
    </React.Fragment>
  )
}

export default DeleteDialog