const express = require('express')
const { Account } = require('../models/Account')
const accounts = express.Router()

accounts.put('/deposit/:agencia/:conta/:amount', async (req, res) => {
  const { agencia, conta, amount } = req.params
  try {
    const account = await Account.findOneAndUpdate(
      { agencia, conta },
      { $inc: { balance: +amount } },
      { new: true }
    )
    if (!account) res.status(404).send()
    else res.send(account)
  } catch (error) {
    console.log(error)
  }
  return res.send()
})

accounts.put('/withdraw/:agencia/:conta/:amount', async (req, res) => {
  const { agencia, conta, amount } = req.params
  try {
    const account = await Account.findOne({ agencia, conta })
    if (!account) return res.status(404).send()
    if (account.balance < +amount)
      return res.status(400).send({ message: 'Saldo insuficiente' })
    await Account.updateOne(
      { _id: account._id },
      { $inc: { balance: -(+amount + 1) } }
    )
    return res.send()
  } catch (err) {
    console.log(err)
  }
})

accounts.get('/balance/:agencia/:conta', async (req, res) => {
  const { agencia, conta } = req.params
  try {
    const account = await Account.findOne({ agencia, conta })
    if (!account) return res.status(404).send()
    else return res.send({ balance: account.balance })
  } catch (error) {
    console.log(error)
  }
  return res.send()
})

accounts.delete('/:agencia/:conta', async (req, res) => {
  const { agencia, conta } = req.params
  await Account.deleteOne({ agencia, conta })
  const result = await Account.find({ agencia }).count()
  return res.send({ contasAtivas: result })
})

accounts.put('/transfer/:origem/:destino/:amount', async (req, res) => {
  const { origem, destino, amount } = req.params
  const contaOrigem = await Account.findOne({ conta: origem })
  const contaDestino = await Account.findOne({ conta: destino })
  const taxa = contaOrigem.agencia !== contaDestino.agencia ? 8 : 0
  contaOrigem.balance = (contaOrigem.balance - +amount) - taxa
  contaDestino.balance += +amount
  contaOrigem.save()
  contaDestino.save()
  return res.send({ balance: contaOrigem.balance })
})

accounts.get('/average/:agencia', async (req, res) => {
  const { agencia } = req.params
  const contas = await Account.find({ agencia })
  const avg =
    contas.reduce((total, current) => total + current.balance, 0) /
    contas.length
  return res.send({ average: +avg.toFixed(2) })
})

const getClients = async (order, req, res) => {
  const { limit } = req.params
  const result = await Account.find()
    .sort(order)
    .limit(+limit)
  return res.send(result)
}

accounts.get('/rich/:limit', async (req, res) => {
  return await getClients({ balance: -1 }, req, res)
})

accounts.get('/poor/:limit', async (req, res) => {
  return await getClients({ balance: 1 }, req, res)
})

accounts.put('/promote', async (req, res) => {
  const private = 99
  const data = await Account.find({ agencia: { $ne: private } })
  const ids = data.map((a) => a.agencia)
  const agencias = [...new Set(ids)]
  const richers = []
  for (const agencia of agencias) {
    const richer = await Account.find({ agencia })
      .sort({ balance: -1 })
      .limit(1)
    richer[0].agencia = private
    richer[0].save()
    richers.push(richer[0])
  }
  return res.send(richers)
})

module.exports = { accounts }
