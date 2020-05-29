import { createServer } from 'http'
const PORT = 8080
const server = createServer((req, res) => {
  res.statusCode = 200
  res.write('Hello Node!!')
  res.end()
})
server.listen(PORT)
