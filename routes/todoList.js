const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
  getTodos,
  getTodosById,
  updateTodo,
  deleteTodo,
  createTodo,
} = require('../controllers/todoList');

router.get(
  '/',
  passport.authenticate('sonter-authen', { session: false }),
  getTodos
);

router.get(
  '/:id',
  passport.authenticate('sonter-authen', { session: false }),
  getTodosById
);

router.delete(
  '/:id',
  passport.authenticate('sonter-authen', { session: false }),
  deleteTodo
);
router.post(
  '/',
  passport.authenticate('sonter-authen', { session: false }),
  createTodo
);
router.patch(
  '/:id',
  passport.authenticate('sonter-authen', { session: false }),
  updateTodo
);

module.exports = router;
