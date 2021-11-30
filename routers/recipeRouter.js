const { Router } = require('express');
const { recipeController } = require('../controllers/recipeController');

const recipeRouter = new Router();

recipeRouter.get('/', recipeController.getRecipes);
recipeRouter.get('/:recipetId', recipeController.getRecipe);
recipeRouter.post('/', recipeController.addRecipe);
recipeRouter.patch('/:recipeId', recipeController.updateRecipe);
recipeRouter.delete('/:recipeId', recipeController.deleteRecipe);

module.exports = { recipeRouter };