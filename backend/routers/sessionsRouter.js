const { Router } = require('express');
const { sessionsController } = require('../controllers/sessionsController');

const sessionsRouter = new Router();

sessionsRouter.get('/login', sessionsController.login);
sessionsRouter.get('/logout', sessionsController.logout);

module.exports = { sessionsRouter };