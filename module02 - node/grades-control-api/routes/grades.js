import express from 'express'
import { readFile, writeFile } from 'fs/promises'
const FILE_NAME = 'grades.json'

const read = async () =>
  JSON.parse(await readFile(FILE_NAME, { encoding: 'UTF-8' }))
const write = async (data) => await writeFile(FILE_NAME, JSON.stringify(data))

const router = express.Router()
router.get('/(:id)?', async (req, res) => {
  const result = await read()
  if (req.params.id)
    res.status(200).send(result.grades.find((i) => i.id === +req.params.id))
  res.status(200).send(result.grades)
})

router.post('/', async (req, res) => {
  if (!req.body) res.status(400).send('Data required')
  const data = await read()
  const newData = { ...req.body, id: data.nextId++, timestamp: new Date() }
  data.grades.push(newData)
  await write(data)
  res.status(200).send(newData)
})

router.delete('/:id', async (req, res) => {
  if (!req.params.id) res.status(400).send('ID required')
  const data = await read()
  data.grades = data.grades.filter((item) => item.id !== +req.params.id)
  await write(data)
  res.status(204).send()
})

router.put('/:id', async (req, res) => {
  if (!req.params.id) res.status(400).send('ID required')
  if (!req.body) res.status(400).send('Data required')
  const data = await read()
  const index = data.grades.findIndex((item) => item.id === +req.params.id)
  if (index > -1) {
    const newData = {
      id: +req.params.id,
      ...req.body,
      timestamp: new Date(),
    }
    data.grades[index] = newData
    await write(data)
    res.status(200).send(newData)
  } else {
    res.status(404).send()
  }
})
router.get('/totalgrade/:student/:subject', async (req, res) => {
  const { subject, student } = req.params
  if (!subject || !student) res.status(400).send('Parameters required')
  const data = await read()
  const totalGrade = data.grades
    .filter((grade) => grade.subject === subject && grade.student === student)
    .map((grade) => grade.value)
    .reduce((a, b) => a + b, 0)
  res.status(200).send({ total: totalGrade })
})

router.get('/average/:subject/:type', async (req, res) => {
  const { subject, type } = req.params
  if (!subject || !type) res.status(400).send('Parameters required')
  const data = await read()
  const grades = data.grades.filter(
    (grade) => grade.subject === subject && grade.type === type
  )
  const sumGrade = grades.map((grade) => grade.value).reduce((a, b) => a + b, 0)
  const average = sumGrade / grades.length
  res.status(200).send({ average: average })
})

router.get('/top3/:subject/:type', async (req, res) => {
  const { subject, type } = req.params
  if (!subject || !type) res.status(400).send('Parameters required')
  const data = await read()
  const grades = data.grades.filter(
    (grade) => grade.subject === subject && grade.type === type
  )
  const top3 = grades.sort((a, b) => b.value - a.value).slice(0, 3)
  res.status(200).send(top3)
})

export default router
