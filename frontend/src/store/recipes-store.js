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

    },
    actions: {
        loadRecipes({ commit }, { filter }) {
            recipesService.query(filter)
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
            return recipesService.save(recipe).then(savedRecipe => {
                const filter = { 'title': '', 'sort': 'likes' };
                dispatch({ type: "loadRecipes", filter });
                return savedRecipe;
            }).catch((err) => {
                throw err;
            })
        },
        updateRecipe({ dispatch }, { recipe }) {
            return recipesService.save(recipe).then(updatedRecipe => {
                const filter = { 'title': '', 'sort': 'likes' };
                dispatch({ type: "loadRecipes", filter });

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