const express = require('express')
const router = express.Router()
const messageController = require('../controllers/message') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, messageController.getMessages)

router.post('/createMessage', messageController.createMessage)

// router.put('/markComplete', todosController.markComplete)

// router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteMessage', messageController.deleteMessage)

module.exports = router