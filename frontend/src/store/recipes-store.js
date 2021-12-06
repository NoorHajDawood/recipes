import { recipesService } from '@/services/recipe-service.js';

export const recipesStore = ({
    strict: true,
    state: {
        recipes: [],
        currRecipe: null
    },
    getters: {
        recipes() {
            return state.recipes;
        },
        recipesForDisplay(state) {
            let recipes = JSON.parse(JSON.stringify(state.recipes));
            return recipes;
        }
    },
    mutations: {
        setRecipes(state, { recipes }) {
            state.recipes = recipes;
        },
        getRecipe(state, { recipe }) {
            state.currRecipe = recipe;
        },
        // addRecipe(state, { recipe }) {
        //     state.recipes.unshift(recipe);
        // },
        // updateRecipe(state, { recipe }) {
        //     const idx = state.recipes.findIndex(saveRecipe => recipe._id == saveRecipe._id);
        //     state.recipes.splice(idx, 1, recipe);
        // },
        // removeRecipe(state, { recipeId }) {
        //     const idx = state.recipes.findIndex(recipe => recipe._id == recipeId);
        //     state.recipes.splice(idx, 1);
        // }

    },
    actions: {
        loadRecipes({ commit }) {
            recipesService.query()
                .then((recipes) => {
                    commit({ type: 'setRecipes', recipes })
                })
                .catch((err) => {
                    throw err;
                });
        },
        getRecipe({ commit }, { recipeId }) {
            return recipesService.getById(recipeId)
                .then(recipe => {
                    commit({ type: "getRecipe", recipe })
                    return recipe;
                })
                .catch((err) => {
                    throw err;
                })
        },
        addRecipe({ dispatch }, { recipe }) {
            console.log(`Store addRecipe: `, recipe);
            return recipesService.save(recipe).then(savedRecipe => {
                console.log('recive recipe 555 - before dispatch', savedRecipe);
                dispatch({ type: "loadRecipes" });
                console.log('recipeAdd5 - after dispatch', savedRecipe);
                return savedRecipe;
            }).catch((err) => {
                throw err;
            })
        },
        updateRecipe({ dispatch }, { recipe }) {
            return recipesService.save(recipe).then(updatedRecipe => {
                dispatch({ type: "loadRecipes" });

                return updatedRecipe;
            }).catch((err) => {
                throw err;
            })
        },
        async removeRecipe({ dispatch }, { recipeId }) {
            try {
                await recipesService.remove(recipeId);
                dispatch({ type: "loadRecipes" });

            } catch (err) {
                throw err;
            }
        },
        addLikeToRecipe({ commit, dispatch }, { recipe }) {
            const recipeCopy = JSON.parse(JSON.stringify(recipe));
            recipeCopy.likes++;
            dispatch({ type: 'updateRecipe', recipe: recipeCopy });
        },
        removeLikeFromRecipe({ commit, dispatch }, { recipe }) {
            const recipeCopy = JSON.parse(JSON.stringify(recipe));
            recipeCopy.likes--;
            dispatch({ type: 'updateRecipe', recipe: recipeCopy });
        }
    },
    modules: {},
});

window.recipeStore = recipesStore