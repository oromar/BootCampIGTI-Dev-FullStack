import express from 'express'
import { readFile, writeFile } from 'fs/promises'
const FILE_NAME = 'grades.json'

const read = async () =>
  JSON.parse(await readFile(FILE_NAME, { encoding: 'UTF-8' }))
const write = async (data) => await writeFile(FILE_NAME, JSON.stringify(data))

const router = express.Router()
router.get('/(:id)?', async (req, res) => {
  const data = await read()
  if (req.params.id)
    return res.send(data.grades.find((i) => i.id === +req.params.id))
  if (req.query && req.query.q) {
    const q = req.query.q.toLowerCase()
    const result = data.grades.filter(
      (grade) =>
        grade.student.toLowerCase().indexOf(q) !== -1 ||
        grade.type.toLowerCase().indexOf(q) !== -1 ||
        grade.subject.toLowerCase().indexOf(q) !== -1
    )
    return res.send(result)
  }
  res.send(data.grades)
})

router.post('/', async (req, res) => {
  const { student, subject, value, type } = req.body
  if (!student || !subject || !value || !type)
    return res.status(400).send('Data required')
  const data = await read()
  const newData = { ...req.body, id: data.nextId++, timestamp: new Date() }
  data.grades.push(newData)
  await write(data)
  res.status(201).send(newData)
})

router.delete('/:id', async (req, res) => {
  if (!req.params.id) return res.status(400).send('ID required')
  const data = await read()
  data.grades = data.grades.filter((item) => item.id !== +req.params.id)
  await write(data)
  res.status(204).send()
})

router.put('/:id', async (req, res) => {
  if (!req.params.id) return res.status(400).send('ID required')
  if (!req.body) return res.status(400).send('Data required')
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
    res.send(newData)
  } else {
    res.status(404).send()
  }
})
router.get('/totalgrade/:student/:subject', async (req, res) => {
  const { subject, student } = req.params
  if (!subject || !student) return res.status(400).send('Parameters required')
  const data = await read()
  const totalGrade = data.grades
    .filter((grade) => grade.subject === subject && grade.student === student)
    .map((grade) => grade.value)
    .reduce((a, b) => a + b, 0)
  res.send({ total: totalGrade })
})

router.get('/average/:subject/:type', async (req, res) => {
  const { subject, type } = req.params
  if (!subject || !type) return res.status(400).send('Parameters required')
  const data = await read()
  const grades = data.grades.filter(
    (grade) => grade.subject === subject && grade.type === type
  )
  const sumGrade = grades.map((grade) => grade.value).reduce((a, b) => a + b, 0)
  const average = sumGrade / grades.length
  res.send({ average: average })
})

router.get('/top3/:subject/:type', async (req, res) => {
  const { subject, type } = req.params
  if (!subject || !type) return res.status(400).send('Parameters required')
  const data = await read()
  const grades = data.grades.filter(
    (grade) => grade.subject === subject && grade.type === type
  )
  const top3 = grades.sort((a, b) => b.value - a.value).slice(0, 3)
  res.send(top3)
})

export default router
