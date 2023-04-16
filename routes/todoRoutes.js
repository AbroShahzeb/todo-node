const express = require('express')
const todoController = require('../controllers/todoControllers')

const router = express.Router()



router.get('/edit/:id', todoController.editTodo)
router.get('/new', todoController.getTodoNew)

router.post('/new', todoController.postNewTodo)

router.get('/', todoController.getAllTodos)


router.put('/edit/:id', todoController.editTodoPut)

router.delete('/delete/:id', todoController.deleteTodo)

router.delete('/delete-all', todoController.deleteAll)

router.delete('/delete-selected', todoController.deleteSelected)

module.exports = router