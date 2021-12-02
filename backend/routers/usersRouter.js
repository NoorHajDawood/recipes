const { Router } = require('express');
const { usersController } = require('../controllers/usersController');

const usersRouter = new Router();

usersRouter.get('/', usersController.getUsers);
usersRouter.get('/:usertId', usersController.getUser);
usersRouter.post('/', usersController.addUser);
usersRouter.patch('/:usertId', usersController.updateUser);
usersRouter.delete('/:usertId', usersController.deleteUser);


module.exports = { usersRouter };