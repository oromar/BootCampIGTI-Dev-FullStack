import express from 'express'
const PORT = 8080
const app = express()
const router = express.Router()
router.get('/abc', (req, res) => {
  console.log('/routes')
  res.end()
})
app.use('/routes', router)
app.listen(PORT, console.log('started...'))
