const db = require('../models');

const getTodos = async (req, res) => {
  const allTodos = await db.todo.findAll({
    where: { user_id: req.user.id },
  });
  res.status(200).send(allTodos);
};

const getTodosById = async (req, res) => {
  const targetId = Number(req.params.id);
  const targetTodo = await db.todo.findOne({
    where: { id: targetId, user_id: req.user.id },
  });
  res.status(200).send(targetTodo);
};

const updateTodo = async (req, res) => {
  const targetId = Number(req.params.id);
  const targetTodo = await db.todo.findOne({
    where: { id: targetId, user_id: req.user.id },
  });
  if (targetTodo) {
    targetTodo.update({
      task: req.body.task,
    });
    res.status(200).send({ message: `Updated ID ${targetId}` });
  } else {
    res.status(404).send({ message: `Not Found` });
  }
};

const deleteTodo = async (req, res) => {
  const targetId = Number(req.params.id);

  const targetTodo = await db.todo.findOne({
    where: { id: targetId, user_id: req.user.id },
  });
  if (targetTodo) {
    targetTodo.destroy();
    res.status(204).send('Delete แล้วเด้อ');
  } else {
    res.status(404).send('Todo List Not Found NaJA');
  }
};
const createTodo = async (req, res) => {
  const addTodo = await db.todo.create({
    task: req.body.task,
    user_id: req.user.id,
  });
  res.status(201).send(addTodo);
};

module.exports = {
  getTodos,
  getTodosById,
  updateTodo,
  deleteTodo,
  createTodo,
};
