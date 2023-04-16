const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const todoRoutes = require('./routes/todoRoutes')
const todoController = require('./controllers/todoControllers')
const methodOverride = require('method-override')

const app = express()
mongoose.connect('mongodb://127.0.0.1:27017/todos')

app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs')
app.use('/todos', todoRoutes)

app.get('/', todoController.getAllTodos)


app.listen(3000, () => console.log('App is listening on port 3000'))