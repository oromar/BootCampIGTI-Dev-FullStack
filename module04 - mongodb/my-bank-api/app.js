const express = require('express')
const mongoose = require('mongoose')
const { accounts } = require('./routes/accounts')

const URI = ''
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express()
app.use(express.json())

app.use('/accounts', accounts)

app.listen(3000, () => console.log('Listening'))
