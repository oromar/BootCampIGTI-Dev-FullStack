const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
client.connect(async (err) => {
  const collection = client.db('grades').collection('students')
  const documents = await collection.find().toArray()
  console.log(documents)
  client.close()
})

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((e) => console.log('connected'))

const newURI =
  'mongodb+srv://igti:igti123@bootcampigti-rlfq8.mongodb.net/bank?retryWrites=true&w=majority'
const newClient = new MongoClient(newURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
newClient.connect(async (err) => {
  if (err) console.log(err)
  const collection = newClient.db('bank').collection('accounts')
  const documents = await collection.find().limit(10).toArray()
  console.log(documents)
  newClient.close()
})
