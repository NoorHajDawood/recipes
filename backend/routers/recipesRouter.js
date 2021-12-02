const { Router } = require('express');
const { recipesController } = require('../controllers/recipesController');

const recipesRouter = new Router();

recipesRouter.get('/', recipesController.getRecipes);
recipesRouter.get('/:recipeId', recipesController.getRecipe);
recipesRouter.post('/', recipesController.addRecipe);
recipesRouter.patch('/:recipeId', recipesController.updateRecipe);
recipesRouter.delete('/:recipeId', recipesController.deleteRecipe);

module.exports = { recipesRouter };