"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.recipesStore = void 0;

var _recipeService = require("@/services/recipe-service.js");

var recipesStore = {
    strict: true,
    state: {
        recipes: [],
        currRecipe: null
    },
    getters: {
        recipes: function recipes() {
            return state.recipes;
        },
        recipesForDisplay: function recipesForDisplay(state) {
            var recipes = JSON.parse(JSON.stringify(state.recipes));
            return recipes;
        }
    },
    mutations: {
        setRecipes: function setRecipes(state, _ref) {
            var recipes = _ref.recipes;
            state.recipes = recipes;
        },
        getRecipe: function getRecipe(state, _ref2) {
            var recipe = _ref2.recipe;
            state.currRecipe = recipe;
        },
        addRecipe: function addRecipe(state, _ref3) {
            var recipe = _ref3.recipe;
            state.recipes.unshift(recipe);
        },
        updateRecipe: function updateRecipe(state, _ref4) {
            var recipe = _ref4.recipe;
            var idx = state.recipes.findIndex(function(saveRecipe) {
                return recipe._id == saveRecipe._id;
            });
            state.recipes.splice(idx, 1, recipe);
        },
        removeRecipe: function removeRecipe(state, _ref5) {
            var recipeId = _ref5.recipeId;
            var idx = state.recipes.findIndex(function(recipe) {
                return recipe._id == recipeId;
            });
            state.recipes.splice(idx, 1);
        }
    },
    actions: {
        loadRecipes: function loadRecipes(_ref6) {
            var commit = _ref6.commit,
                state = _ref6.state;

            _recipeService.recipesService.query().then(function(recipes) {
                commit({
                    type: 'setRecipes',
                    recipes: recipes
                });
            });
        },
        getRecipe: function getRecipe(_ref7, _ref8) {
            var commit = _ref7.commit;
            var recipeId = _ref8.recipeId;
            return _recipeService.recipesService.getById(recipeId).then(function(recipe) {
                commit({
                    type: "getRecipe",
                    recipe: recipe
                });
                return recipe;
            });
        },
        addRecipe: function addRecipe(_ref9, _ref10) {
            var _this = this;

            var commit = _ref9.commit;
            var recipe = _ref10.recipe;
            return _recipeService.recipesService.save(recipe).then(function(savedRecipe) {
                commit({
                    type: "addRecipe",
                    recipe: savedRecipe
                });
                return savedRecipe;
            })["catch"](function() {
                _this.$notify.error({
                    title: 'Error',
                    message: 'Error save recipe'
                });
            });
        },
        updateRecipe: function updateRecipe(_ref11, _ref12) {
            var _this2 = this;

            var commit = _ref11.commit;
            var recipe = _ref12.recipe;
            return _recipeService.recipesService.save(recipe).then(function(updatedRecipe) {
                commit({
                    type: "updateRecipe",
                    recipe: updatedRecipe
                });
                return updatedRecipe;
            })["catch"](function(err) {
                _this2.$notify.error({
                    title: 'Error',
                    message: 'Error save changes'
                });
            });
        },
        removeRecipe: function removeRecipe(_ref13, _ref14) {
            var commit, recipeId;
            return regeneratorRuntime.async(function removeRecipe$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            commit = _ref13.commit;
                            recipeId = _ref14.recipeId;
                            _context.prev = 2;
                            _context.next = 5;
                            return regeneratorRuntime.awrap(_recipeService.recipesService.remove(recipeId));

                        case 5:
                            commit({
                                type: 'removeRecipe',
                                recipeId: recipeId
                            });
                            _context.next = 12;
                            break;

                        case 8:
                            _context.prev = 8;
                            _context.t0 = _context["catch"](2);
                            this.$notify.error({
                                title: 'Error',
                                message: 'Error remove recipe'
                            });
                            throw _context.t0;

                        case 12:
                        case "end":
                            return _context.stop();
                    }
                }
            }, null, this, [
                [2, 8]
            ]);
        },
        addLikeToRecipe: function addLikeToRecipe(_ref15, _ref16) {
            var commit = _ref15.commit,
                dispatch = _ref15.dispatch;
            var recipe = _ref16.recipe;
            var recipeCopy = JSON.parse(JSON.stringify(recipe));
            recipeCopy.likes++;
            dispatch({
                type: 'updateRecipe',
                recipe: recipeCopy
            });
        },
        removeLikeFromRecipe: function removeLikeFromRecipe(_ref17, _ref18) {
            var commit = _ref17.commit,
                dispatch = _ref17.dispatch;
            var recipe = _ref18.recipe;
            var recipeCopy = JSON.parse(JSON.stringify(recipe));
            recipeCopy.likes--;
            dispatch({
                type: 'updateRecipe',
                recipe: recipeCopy
            });
        }
    },
    modules: {}
};
exports.recipesStore = recipesStore;