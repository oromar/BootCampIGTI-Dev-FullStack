import { db } from '../models/index.js'
import { logger } from '../config/logger.js'

const create = async (req, res) => {
  if (!req.body) return res.status(400).send()

  const { name, subject, type, value } = req.body
  try {
    await db.Grades.create({ name, subject, type, value })
    res.status(200).send()
    logger.info(`POST /grade - ${JSON.stringify(req.body)}`)
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' })
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`)
  }
}

const findAll = async (req, res) => {
  const name = req.query.name

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {}

  try {
    res.send(await db.Grades.find(condition))
    logger.info(`GET /grade`)
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' })
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`)
  }
}

const findOne = async (req, res) => {
  const id = req.params.id

  try {
    res.send(await db.Grades.find({ _id: id }))

    logger.info(`GET /grade - ${id}`)
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id })
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`)
  }
}

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    })
  }

  const id = req.params.id
  const { name, subject, type, value } = req.body

  try {
    await db.Grades.findOneAndUpdate(
      { _id: id },
      { name, subject, type, value }
    )
    res.send({ message: 'Grade atualizado com sucesso' })

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`)
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id })
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`)
  }
}

const remove = async (req, res) => {
  const id = req.params.id

  try {
    await db.Grades.deleteOne({ _id: id })
    res.send({ message: 'Grade excluido com sucesso' })

    logger.info(`DELETE /grade - ${id}`)
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id })
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`)
  }
}

const removeAll = async (req, res) => {
  const id = req.params.id

  try {
    await db.Grades.deleteMany({})
    res.send({
      message: `Grades excluidos`,
    })
    logger.info(`DELETE /grade`)
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' })
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`)
  }
}

export default { create, findAll, findOne, update, remove, removeAll }
