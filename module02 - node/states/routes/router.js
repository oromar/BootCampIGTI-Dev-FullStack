import express from 'express'
import { writeFile, readFile, readdir } from 'fs/promises'

const read = async (path) => {
  const fileData = await readFile(path, { encoding: 'UTF-8' })
  return JSON.parse(fileData)
}
const write = async (path, data) => {
  await writeFile(path, JSON.stringify(data))
}
const getStatesCitiesCount = async (files) => {
  const lengths = []
  for (let file of files) {
    const data = await read(`./data/${file}`)
    lengths.push({ UF: file.substring(0, 2), length: data.length })
  }
  return lengths
}
const getCitiesFromFiles = async (files) => {
  const result = []
  for (let file of files) {
    const data = await read(`./data/${file}`)
    result.push(
      ...data.map((city) => ({ nome: city.Nome, UF: file.substring(0, 2) }))
    )
  }
  return result
}

const getOneCityPerStateByComparator = async (files, comparator) => {
  const result = []
  for (let file of files) {
    const stateCities = []
    const data = await read(`./data/${file}`)
    stateCities.push(
      ...data.map((city) => ({ nome: city.Nome, UF: file.substring(0, 2) }))
    )
    const sorted = stateCities.sort(comparator)
    result.push(...sorted.slice(0, 1))
  }
  return result
}

const router = express.Router()
router.post('/create', async (req, res) => {
  const states = await read('Estados.json')
  const cities = await read('Cidades.json')
  states.forEach(async (state) => {
    const data = cities.filter((city) => city.Estado === state.ID)
    await write(`./data/${state.Sigla}.json`, data)
  })
  res.status(200).send('OK')
})

router.get('/:UF/cities/count', async (req, res) => {
  if (req.params.UF) {
    const data = await read(`./data/${req.params.UF}.json`)
    if (data) res.status(200).send({ UF: req.params.UF, length: data.length })
    else res.status(400).send('Invalid UF')
  } else {
    res.status(400).send('UF required')
  }
})

router.get('/state/greatests', async (req, res) => {
  const files = await readdir('./data')
  const lengths = await getStatesCitiesCount(files)
  const reduced = lengths
    .sort((a, b) => a.length - b.length)
    .reverse()
    .slice(0, 5)
  const result = reduced.map((item) => `${item.UF} - ${item.length}`)
  console.log(result)
  res.status(200).send(result)
})

router.get('/state/lowests', async (req, res) => {
  const files = await readdir('./data')
  const lengths = await getStatesCitiesCount(files)
  const reduced = lengths.sort((a, b) => a.length - b.length).slice(0, 5)
  const result = reduced.map((item) => `${item.UF} - ${item.length}`).reverse()
  console.log(result)
  res.status(200).send(result)
})

router.get('/cities/largestNames', async (req, res) => {
  const files = await readdir('./data')
  const cities = await getOneCityPerStateByComparator(
    files,
    (a, b) => b.nome.length - a.nome.length || a.nome.localeCompare(b.nome)
  )
  const result = cities.map((city) => `${city.nome} - ${city.UF}`)
  console.log(result)
  res.status(200).send(result)
})

router.get('/cities/smallestNames', async (req, res) => {
  const files = await readdir('./data')
  const cities = await getOneCityPerStateByComparator(
    files,
    (a, b) => a.nome.length - b.nome.length || a.nome.localeCompare(b.nome)
  )
  const result = cities.map((city) => `${city.nome} - ${city.UF}`)
  console.log(result)
  res.status(200).send(result)
})

router.get('/states/cities/largestName', async (req, res) => {
  const files = await readdir('./data')
  const cities = await getCitiesFromFiles(files)
  const sorted = cities.sort(
    (a, b) => b.nome.length - a.nome.length || a.nome.localeCompare(b.nome)
  )
  const result = sorted.slice(0, 1).map((item) => `${item.nome} - ${item.UF}`)
  console.log(result)
  res.status(200).send(result)
})

router.get('/states/cities/smallestName', async (req, res) => {
  const files = await readdir('./data')
  const cities = await getCitiesFromFiles(files)
  const sorted = cities.sort(
    (a, b) => a.nome.length - b.nome.length || a.nome.localeCompare(b.nome)
  )
  const result = sorted.slice(0, 1).map((item) => `${item.nome} - ${item.UF}`)
  console.log(result)
  res.status(200).send(result)
})

export default router
