import axios from 'axios'

const appService = axios.create({
  baseURL: 'http://localhost:3001/grade',
})

export default appService
