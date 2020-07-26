import React from 'react'
import { IconButton, Dialog, DialogTitle, DialogActions, Button, Typography } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import axios from 'axios'

interface Items {
  source: string,
  id: number,
  count: number,
  setCount: any
}

const DeleteDialog = ({ source, id, count, setCount }: Items) => {
  const [open, setOpen] = React.useState<boolean>(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const deleteItem = () => {
    axios
      .delete("https://stockportfoliotrackerapi.azurewebsites.net/api/" + source + "/" + id)
      .then((res) => {
        if (res.status === 200) {
          alert("Successfully deleted!")
        } else {
          alert("Failed to delete!")
        }
        setCount(count + 1)
      })
      .catch((err) => {console.log(err.response)})
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