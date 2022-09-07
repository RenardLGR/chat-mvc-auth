const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date:{
    type: Date,
    required: true,
    default: Date.now()
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Message', MessageSchema)
