import express from 'express'
import cors from 'cors'
import router from './routes/grades.js'

const PORT = 8080
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/grades', router)
app.listen(PORT, () => `Listening on port ${PORT}`)
