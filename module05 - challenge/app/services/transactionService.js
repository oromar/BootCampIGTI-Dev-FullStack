const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel')

const getFilters = async (req, res) => {
  const result = await TransactionModel.find(
    {},
    { _id: 0, yearMonth: 1 }
  ).distinct('yearMonth')
  return res.send(result)
}

const getByPeriod = async (req, res) => {
  const regex = /^[0-9]{4}-[0-9]{2}$/
  const { period } = req.params
  if (!period)
    return res
      .status(400)
      .send('Período não informado, deve estar no formato yyyy-mm')
  if (!regex.test(period))
    return res
      .status(400)
      .send('Período inválido, deve estar no formato yyyy-mm')
  const result = await TransactionModel.find({ yearMonth: period })
  return res.send(result)
}

const create = async (req, res) => {
  try {
    if (!req.body) return res.status(400).send('Dados obrigatórios')
    const result = await TransactionModel.create({ ...req.body })
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error ? error.message : 'Erro ao salvar')
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) return res.status(400).send('ID Obrigatório')
    if (!req.body) return res.status(400).send('Dados obrigatórios')
    const result = await TransactionModel.findOneAndUpdate(
      { _id: ObjectId(id) },
      { ...req.body },
      { runValidators: true, new: true }
    )
    return res.send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const remove = async (req, res) => {
  const { id } = req.params
  if (!id) return res.status(400).send('ID obrigatório')
  const result = await TransactionModel.findOneAndRemove({ _id: id })
  return res.status(204).send()
}

module.exports = { create, update, remove, getFilters, getByPeriod }
