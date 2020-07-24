import React from 'react'
import axios from 'axios'

export const GetStock = () => {
  return (
    axios
      .get("https://stockportfoliotrackerapi.azurewebsites.net/api/stock")
      .then(res => {
        return (res.data)
      })
  )
}