require('dotenv').config();
const express = require('express');
require('./config/passport');
const cors = require('cors');
const db = require('./models');
const userRoutes = require('./routes/user');
const todoListRoutes = require('./routes/todoList');
const app = express();

app.use(cors());
// ใช้ body แบบ json ทำให้ใช้ req.body ได้
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', userRoutes);
app.use('/todos', todoListRoutes);
db.sequelize.sync({ force: false }).then(() => {
  console.log('Connect Models to my Database');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on port ${process.env.PORT}`);
});
