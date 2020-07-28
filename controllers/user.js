const db = require('../models');
const bc = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { username, password } = req.body;
  const targetUser = await db.User.findOne({ where: { username } });
  if (targetUser) {
    const isCorPW = bc.compareSync(password, targetUser.password);
    if (isCorPW) {
      // console.log(process.env.EXPIRE_TIME);
      const payload = { name: targetUser.name, id: targetUser.id };
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: Number(process.env.EXPIRE_TIME),
      });
      res.status(200).send({
        message: 'Login Successful',
        accessToken: token,
        access_token: token,
      });
    } else {
      res.status(400).send({ message: 'Username or password is incorrect' });
    }
  }
};

const register = async (req, res) => {
  const { username, password, name } = req.body;
  const targetUser = await db.User.findOne({ where: { username } });
  if (targetUser) {
    res.status(400).send({ message: 'Username has already been Taken' });
  } else {
    const salt = bc.genSaltSync(Number(process.env.SALT_ROUND));
    const hashedPW = bc.hashSync(password, salt);

    await db.User.create({ password: hashedPW, username, name });
    res.status(201).send({ message: 'User is created' });
  }
};

module.exports = { login, register };
