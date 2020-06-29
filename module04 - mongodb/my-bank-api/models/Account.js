const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  agencia: {
    type: Number,
    required: true,
  },
  conta: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v > 0
      },
      message: (props) => `${props.value} não pode ser menor que zero`,
    },
  },
})

const Account = new mongoose.model('accounts', schema, 'accounts')

module.exports = { Account }
