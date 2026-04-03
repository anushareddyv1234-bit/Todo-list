// const express = require("express");
// const cors = require("cors");

import express from "express";
import cors from "cors";


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Temporary storage
let todos = [];
let id = 1;

// GET all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// ADD new todo
app.post("/todos", (req, res) => {
  const newTodo = {
    id: id++,
    text: req.body.text
  };
  todos.push(newTodo);
  res.json(newTodo);
});

// UPDATE todo
app.put("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);

  todos = todos.map(todo =>
    todo.id === todoId ? { ...todo, text: req.body.text } : todo
  );

  res.json({ message: "Todo updated" });
});

// DELETE todo
app.delete("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== todoId);

  res.json({ message: "Todo deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
