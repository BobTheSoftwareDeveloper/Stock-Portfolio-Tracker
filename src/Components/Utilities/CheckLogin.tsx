import React from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const CheckLogin = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['SESSION_ID'])

  const url: string = process.env.REACT_APP_BACKEND_URL + "api/check-session"
  axios
    .post(url, {
      session_id: cookies["SESSION_ID"]
    })
    .then((res) => {
      // valid
      return true
    })
    .catch((error) => {
      // invalid
      removeCookie("SESSION_ID")
      window.location.href = "/"
      return false
    })

}

export default CheckLogin