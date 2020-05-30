import express from 'express'
import cors from 'cors'
import router from './routes/router.js'
const PORT = 3333
const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/info', router)
app.listen(PORT, () => console.log('listening'))
