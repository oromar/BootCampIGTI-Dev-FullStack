const http = require('http')
const PORT = 8080
const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.write('Hello Node!!')
  res.end()
})
server.listen(PORT)
