import axios from 'axios'

const get = async(session_id: string) => new Promise<any>((resolve, reject) : any => {
  axios.get(process.env.REACT_APP_BACKEND_URL + "api/get-stock", {
    params: {
      session_id: session_id
    }
  })
    .then(response => {
      resolve(response.data)
    })
    .catch(err => {
      reject(err)
    })
})

export default { get }