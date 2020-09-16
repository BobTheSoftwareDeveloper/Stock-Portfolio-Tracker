import axios from 'axios'
import { useCookies } from 'react-cookie'

const CheckLogin = (session_id: string) => new Promise((resolve, reject) : any => {
  const url: string = process.env.REACT_APP_BACKEND_URL + "api/check-session"
  axios
    .post(url, {
      session_id: session_id
    })
    .then((res) => {
      // valid
      resolve(true)
    })
    .catch((error) => {
      // invalid
      alert("Session invalid. Please login again.")
      reject(false)
    })

})

export default { CheckLogin }