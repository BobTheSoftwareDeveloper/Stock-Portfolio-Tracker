import axios from 'axios'

const get = async(session_id: string) => new Promise<any>((resolve, reject) : any => {
  axios.get(process.env.REACT_APP_BACKEND_URL + "api/get-portfolio", {
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

const update = async(session_id: string, id: number, quantity: number, stock_ticker: string) => new Promise<any>((resolve, reject) : any => {
  axios.post(process.env.REACT_APP_BACKEND_URL + "api/edit-portfolio", {
    session_id: session_id,
    id: id,
    quantity: quantity,
    stock_ticker: stock_ticker
  })
    .then(response => {
      resolve(response.data)
    })
    .catch(err => {
      reject(err)
    })
})

const add = async(session_id: string, quantity: number, stock_ticker: string) => new Promise<any>((resolve, reject) : any => {
  axios.post(process.env.REACT_APP_BACKEND_URL + "api/add-portfolio", {
    session_id: session_id,
    quantity: quantity,
    stock_ticker: stock_ticker
  })
    .then(response => {
      resolve(response.data)
    })
    .catch(err => {
      reject(err)
    })
})

const remove = async(session_id: string, id: number) => new Promise<any>((resolve, reject) : any => {
  axios.post(process.env.REACT_APP_BACKEND_URL + "api/delete-portfolio", {
    session_id: session_id,
    id: id
  })
    .then(response => {
      resolve(response.data)
    })
    .catch(err => {
      reject(err)
    })
})

export default { get, add, update, remove }