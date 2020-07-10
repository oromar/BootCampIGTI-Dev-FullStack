import mongoose from 'mongoose'

const db = {}
db.mongoose = mongoose
db.url =
  process.env.MONGODB 

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  type: { type: String, required: true },
  value: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v > 0
      },
      message: (props) => `${props.value} não pode ser menor que zero.`,
    },
  },
  lastModified: { type: Date, default: new Date() },
})

db.Grades = new mongoose.model('grades', schema, 'grades')

export { db }
