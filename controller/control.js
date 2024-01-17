import {Todo}  from '../Api/Api.js';

export const createTodos = async (req, res) => {
    try {
        
        const todo = new Todo(req.body);

        if(!todo) {
            return res.status(400).json({msg: "Error while saving data"});
    
        }
        const newTodo = await todo.save();
        res.status(200).json({msg:"Task Created Successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        if(!todos) {
            return res.status(400).json({msg: "Error while fetching data"});
        }
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if(!todo) {
            return res.status(400).json({msg: "Error while fetching data"});
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}   

export const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if(!todo) {
            return res.status(401).json({msg: "Error while fetching data"});
        }
        const upTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({msg:"Task Updated Successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteTodo = async (req, res) => { 
    try {
        const todo = await Todo.findById(req.params.id);
        if(!todo) {
            return res.status(401).json({msg: "Error while fetching data"});
        }
        const delTodo = await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({msg:"Task Deleted Successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}