const Todo = require('../models/todo')
const qs = require('querystring')
module.exports.getTodoNew = (req, res) => {
    const todo = new Todo()
    res.render('todos/new', { pageTitle: 'Add new todo', todo: todo, btnTitle: 'Create', btnIcon: 'square-plus' })
}

module.exports.getAllTodos = async (req, res) => {
    let todos = await Todo.find()
    // let options =  {  }
    todos = todos.map(todo => {
        return {
            id: todo._id,
            title: todo.title,
            description: todo.description,
            createdAt: new Date(todo.createdAt).toLocaleString(),
            updatedAt: new Date(todo.updatedAt).toLocaleString(),
            __v: todo.__v
        }
    })

    console.log(todos)
    res.render('todos/index', { todos: todos, pageTitle: 'All Todos' })
}

module.exports.postNewTodo = async (req, res) => {
    let todo = new Todo({
        title: req.body.todo,
        description: req.body.description
    })

    try {
        todo = await todo.save()
        res.redirect('/')
    } catch(e) {
        console.log(e)
        res.redirect('/')
    }
}

module.exports.editTodo = async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    res.render('todos/edit', {todo: todo, pageTitle: 'Edit todo', btnTitle: 'Save', btnIcon: 'check'})
}

module.exports.editTodoPut = async (req, res) => {
    await Todo.findByIdAndUpdate(req.params.id, {
        title: req.body.todo,
        description: req.body.description,
        updatedAt: new Date()
    })

    res.redirect('/')
}

module.exports.deleteTodo = async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id)
    res.redirect('/')
}

module.exports.deleteAll = async (req, res) => {
    await Todo.deleteMany({})
    res.redirect('/')
}

module.exports.deleteSelected = async (req, res) => {
    let ids = req.body.ids + ','
    let idsArray = ids.split(',')
    idsArray.pop()
    await Todo.deleteMany({_id: {$in : idsArray}}).then(() => {

        res.redirect('/')
    })
}