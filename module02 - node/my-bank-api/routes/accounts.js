import express from 'express'
import { readFile, writeFile } from 'fs/promises'
import { FILE_NAME, statusCode } from '../constants.js'
const accountsRouter = express.Router()

const writeData = async (json) =>
  await writeFile(FILE_NAME, JSON.stringify(json))

const openFile = async () => {
  const fileData = await readFile(FILE_NAME, { encoding: 'UTF-8' })
  return JSON.parse(fileData)
}

accountsRouter.get('/', async (req, res) => {
  const json = await openFile()
  res.send(json.accounts)
})

accountsRouter.get('/:id', async (req, res) => {
  const json = await openFile()
  const result = json.accounts.find((item) => item.id === +req.params.id)
  if (result) {
    res.send(result)
  } else {
    res.status(statusCode.NOT_FOUND).end()
  }
})

accountsRouter.post('/', async (req, res) => {
  const json = await openFile()
  const id = Math.max(...json.accounts.map((i) => i.id)) + 1
  json.accounts.push({ ...req.body, id })
  await writeData(json)
  res.status(statusCode.OK).end()
})

accountsRouter.put('/:id', async (req, res) => {
  const json = await openFile()
  const index = json.accounts.findIndex((item) => item.id === +req.params.id)
  if (index > -1) {
    json.accounts[index] = { ...req.body, id: +req.params.id }
    await writeData(json)
    res.statusCode = statusCode.OK
  } else {
    res.statusCode = statusCode.NOT_FOUND
  }
  res.end()
})

accountsRouter.delete('/:id', async (req, res) => {
  const json = await openFile()
  const account = json.accounts.find((item) => item.id === +req.params.id)
  if (account) {
    json.accounts = json.accounts.filter((item) => item.id !== +req.params.id)
    await writeData(json)
    res.statusCode = statusCode.OK
  } else {
    res.statusCode = statusCode.NOT_FOUND
  }
  res.end()
})

accountsRouter.post('/withdraw/:id/:amount', async (req, res) => {
  const json = await openFile()
  const index = json.accounts.findIndex((item) => item.id === +req.params.id)
  if (index > -1) {
    if (json.accounts[index].balance >= req.params.amount) {
      json.accounts[index].balance -= +req.params.amount
      await writeData(json)
      res.statusCode = statusCode.OK
    } else {
      res.statusCode = statusCode.BAD_REQUEST
    }
  } else {
    res.statusCode = statusCode.NOT_FOUND
  }
  res.end()
})

accountsRouter.post('/deposit/:id/:amount', async (req, res) => {
  if (req.params.amount < 0) {
    res.statusCode = statusCode.BAD_REQUEST
    res.end()
  }
  const json = await openFile()
  const index = json.accounts.findIndex((item) => item.id === +req.params.id)
  if (index > -1) {
    json.accounts[index].balance += +req.params.amount
    await writeData(json)
    res.statusCode = statusCode.OK
  } else {
    res.statusCode = statusCode.NOT_FOUND
  }
  res.end()
})

export default accountsRouter
