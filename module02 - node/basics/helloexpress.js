const express = require('express')
const PORT = 8080
const app = express()
const handler = (req, res) => res.send('Hello Express!!!')
app.get('/', handler)
app.listen(PORT, () => console.log(`Listening on port: ${PORT}...`))
