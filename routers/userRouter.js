const { Router } = require('express');
const { userController } = require('../controllers/userController');

const userRouter = new Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/:usertId', userController.getUser);
userRouter.post('/', userController.addUser);
userRouter.patch('/:usertId', userController.updateUser);
userRouter.delete('/:usertId', userController.deleteUser);


module.exports = { userRouter };