const express = require('express')
const router = express.Router()
const controller=require('./controller')

router.post('/todo',controller.addTodo)
router.get('/todo',controller.getTodo)
router.put('/todos/:id',controller.updateTodo)
router.delete('/todos/:id',controller.deleteTodo)

module.exports = router;