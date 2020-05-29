import express from 'express'
import fs from 'fs'
import { PORT, FILE_NAME } from './constants.js'
import accountsRouter from './routes/accounts.js'
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/accounts', accountsRouter)
app.listen(PORT, () => {
  if (!fs.existsSync(FILE_NAME)) {
    fs.appendFileSync(FILE_NAME, JSON.stringify({ accounts: [] }))
  }
})
