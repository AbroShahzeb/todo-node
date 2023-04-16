const mongoose = require('mongoose')

const TodoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date,
        immutable: true  
    },
    updatedAt: {
        type: Date,
        default: new Date
    }
})




module.exports = mongoose.model('Todo', TodoSchema)