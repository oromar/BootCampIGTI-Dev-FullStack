import express from 'express'
import fs from 'fs'
import { FILE_NAME, statusCode } from '../constants.js'
const accountsRouter = express.Router()

accountsRouter.get('/', (req, res) => {
  const handler = (err, fileData) => {
    if (err) res.status(500).send(err.message)
    const json = JSON.parse(fileData)
    res.send(json.accounts)
  }
  fs.readFile(FILE_NAME, { encoding: 'UTF-8' }, handler)
})

accountsRouter.get('/:id', (req, res) => {
  const handler = (err, fileData) => {
    if (err) res.status(500).send(err.message)
    const json = JSON.parse(fileData)
    const result = json.accounts.find((item) => item.id === +req.params.id)
    if (result) {
      res.send(result)
    } else {
      res.status(statusCode.NOT_FOUND).end()
    }
  }
  fs.readFile(FILE_NAME, { encoding: 'UTF-8' }, handler)
})

accountsRouter.post('/', (req, res) => {
  const handler = (err, fileData) => {
    if (err) res.status(500).send(err.message)
    const json = JSON.parse(fileData)
    const id = Math.max(...json.accounts.map((i) => i.id)) + 1
    json.accounts.push({ ...req.body, id })
    fs.writeFile(FILE_NAME, JSON.stringify(json), () => {
      res.status(statusCode.OK).end()
    })
  }
  fs.readFile(FILE_NAME, { encoding: 'UTF-8' }, handler)
})

accountsRouter.put('/:id', (req, res) => {
  const handler = (err, fileData) => {
    if (err) res.status(500).send(err.message)
    const json = JSON.parse(fileData)
    const index = json.accounts.findIndex((item) => item.id === +req.params.id)
    if (index > -1) {
      json.accounts[index] = { ...req.body, id: +req.params.id }
      fs.writeFile(FILE_NAME, JSON.stringify(json), () => {
        res.statusCode = statusCode.OK
      })
    } else {
      res.statusCode = statusCode.NOT_FOUND
    }
    res.end()
  }
  fs.readFile(FILE_NAME, { encoding: 'UTF-8' }, handler)
})

accountsRouter.delete('/:id', (req, res) => {
  const handler = (err, fileData) => {
    if (err) res.status(500).send(err.message)
    const json = JSON.parse(fileData)
    const account = json.accounts.find((item) => item.id === +req.params.id)
    if (account) {
      json.accounts = json.accounts.filter((item) => item.id !== +req.params.id)
      fs.writeFile(FILE_NAME, JSON.stringify(json), () => {
        res.statusCode = statusCode.OK
      })
    } else {
      res.statusCode = statusCode.NOT_FOUND
    }
    res.end()
  }
  fs.readFile(FILE_NAME, { encoding: 'UTF-8' }, handler)
})

accountsRouter.post('/withdraw/:id/:amount', (req, res) => {
  const handler = (err, fileData) => {
    if (err) res.status(500).send(err.message)
    const json = JSON.parse(fileData)
    const index = json.accounts.findIndex((item) => item.id === +req.params.id)
    if (index > -1) {
      if (json.accounts[index].balance >= req.params.amount) {
        json.accounts[index].balance -= +req.params.amount
        fs.writeFile(FILE_NAME, JSON.stringify(json), () => {
          res.statusCode = statusCode.OK
        })
      } else {
        res.statusCode = statusCode.BAD_REQUEST
      }
    } else {
      res.statusCode = statusCode.NOT_FOUND
    }
    res.end()
  }
  fs.readFile(FILE_NAME, { encoding: 'UTF-8' }, handler)
})

accountsRouter.post('/deposit/:id/:amount', (req, res) => {
  if (req.params.amount < 0) {
    res.statusCode = statusCode.BAD_REQUEST
    res.end()
  }
  const handler = (err, fileData) => {
    if (err) res.status(500).send(err.message)
    const json = JSON.parse(fileData)
    const index = json.accounts.findIndex((item) => item.id === +req.params.id)
    if (index > -1) {
      json.accounts[index].balance += +req.params.amount
      fs.writeFile(FILE_NAME, JSON.stringify(json), () => {
        res.statusCode = statusCode.OK
      })
    } else {
      res.statusCode = statusCode.NOT_FOUND
    }
    res.end()
  }
  fs.readFile(FILE_NAME, { encoding: 'UTF-8' }, handler)
})

export default accountsRouter
