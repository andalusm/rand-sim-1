const express = require('express')
const router = express.Router()
class Todo {
    constructor() {
        this.todos = []
        this._id = 0
    }
    getNewId() {
        this._id++
        return this._id
    }
    newTodo(text, priority) {
        const newTodo = { id: this.getNewId(), text: text, complete: false, priority: priority }
        this.todos.push(newTodo)
    }
    getTodos() {
        return this.todos
    }
    upgradeTodo(todoID) {
        const todo = this.getTodos().find(t => t.id == todoID)
        if (todo) {
            const priority = todo.priority
            if (priority == "low") {
                todo.priority = "med"
            }
            else if (priority == "med") {
                todo.priority = "high"
            }
            else {
                todo.priority = "low"
            }
        }
    }
    completeTodo(todoID) {
        const t = todo.getTodos().find(t => t.id == todoID).complete
        todo.getTodos().find(t => t.id == todoID).complete = !t
    }
    removeTodo(todoID) {
        const index = todo.getTodos().findIndex(t => t.id == todoID)
        if (index >= 0) {
            todo.getTodos().splice(index, 1)
        }
    }
}

const todo = new Todo()

router.get('/todos', function (req, res) {
    console.log(todo.getTodos())
    res.send(todo.getTodos())
})

router.post('/todo', function (req, res) {
    const text = req.body.text
    const priority = req.body.priority
    todo.newTodo(text, priority)
    res.send(todo.getTodos())
})

router.put('/todo/:todoID', function (req, res) {
    const todoID = req.params.todoID
    todo.completeTodo(todoID)
    res.send(todo.getTodos())
})

router.put('/upgrade/:todoID', function (req, res) {
    const todoID = req.params.todoID
    todo.upgradeTodo(todoID)
    res.send(todo.getTodos())
})

router.delete('/todo/:todoID', function (req, res) {
    const todoID = req.params.todoID
    todo.removeTodo(todoID)
    res.send(todo.getTodos())
})

module.exports = router