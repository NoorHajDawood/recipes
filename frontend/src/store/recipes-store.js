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
        addRecipe(state, { recipe }) {
            state.recipes.unshift(recipe);
        },
        updateRecipe(state, { recipe }) {
            const idx = state.recipes.findIndex(saveRecipe => recipe._id == saveRecipe._id);
            state.recipes.splice(idx, 1, recipe);
        },
        removeRecipe(state, { recipeId }) {
            const idx = state.recipes.findIndex(recipe => recipe._id == recipeId);
            state.recipes.splice(idx, 1);
        }

    },
    actions: {
        loadRecipes({ commit, state }) {
            recipesService.query()
                .then((recipes) => {
                    commit({ type: 'setRecipes', recipes })
                })
        },
        getRecipe({ commit }, { recipeId }) {
            return recipesService.getById(recipeId)
                .then(recipe => {
                    console.log(recipe);
                    commit({ type: "getRecipe", recipe })
                    return recipe;
                })
        },
        addRecipe({ commit }, { recipe }) {
            return recipesService.save(recipe).then(savedRecipe => {
                commit({ type: "addRecipe", recipe: savedRecipe });
                return savedRecipe;
            }).catch(() => {
                this.$notify.error({
                    title: 'Error',
                    message: 'Error save recipe'
                });
            })
        },
        updateRecipe({ commit }, { recipe }) {
            return recipesService.save(recipe).then(updatedRecipe => {
                commit({ type: "updateRecipe", recipe: updatedRecipe });
                return updatedRecipe;
            }).catch(err => {
                this.$notify.error({
                    title: 'Error',
                    message: 'Error save changes'
                });
            });
        },
        async removeRecipe({ commit }, { recipeId }) {
            try {
                await recipesService.remove(recipeId);
                commit({ type: 'removeRecipe', recipeId });
            } catch (err) {
                this.$notify.error({
                    title: 'Error',
                    message: 'Error remove recipe'
                });
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