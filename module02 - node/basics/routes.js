import express from 'express'
const PORT = 8080
const app = express()

app.use((req, res, next) => {
  console.log(new Date())
  next()
})
app.all('/all', (req, res) => res.send(req.method))
app.get('/teste?', (req, res) => res.send('/teste?'))
app.get('/buzz+', (req, res) => res.send('/buzz+'))
app.get('/one*Blue', (req, res) => res.send('/one*Blue'))
app.post('/test(ing)?', (req, res) => res.send('/test(ing)?'))
app.get(/.*Red$/, (req, res) => res.send('/.*Red$/'))
app.get('/params/:id', (req, res) => res.send(req.params.id))
app.get(
  '/multiple',
  (_, res, next) => {
    console.log('first function')
    next()
  },
  (_, res) => {
    console.log('second function')
    res.send('Finished')
    res.end()
  }
)
const callback1 = (_, res, next) => {
  console.log('first function2')
  next()
}
const callback2 = (_, res) => {
  console.log('second function2')
  res.send('Finished')
  res.end()
}
app.get('/multiple2', [callback1, callback2])
const methodHandler = (req, res) =>
  res.send(`${req.method} ${req.params.id || ''}`)
app
  .route('/routes(/:id)?')
  .get(methodHandler)
  .post(methodHandler)
  .delete(methodHandler)
  .put(methodHandler)
app.use('/middleware', (req, res, next) => {
  if (req.method === 'GET') {
    next()
  } else {
    res.end()
  }
})
app.use('/middleware', (req, res) => res.send('GET /middleware'))
app.listen(PORT, () => `Listening on port: ${PORT}`)
