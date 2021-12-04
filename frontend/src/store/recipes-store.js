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
            state.recipes.push(recipe);
        },
        updateRecipe(state, { recipe }) {
            const idx = state.recipes.findIndex(saveRecipe => recipe._id == saveRecipe._id);
            state.recipes.splice(idx, 1, recipe);
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
                    commit({ type: "getRecipe", recipe })
                    return recipe;
                })
        },
        addRecipe({ commit }, { recipe }) {
            return recipesService.save(recipe).then(savedRecipe => {
                commit({ type: "addRecipe", recipe: savedRecipe });
                return savedRecipe;
            })
        },
        updateRecipe({ commit }, { recipe }) {
            return recipesService.save(recipe).then(updatedRecipe => {
                commit({ type: "updateRecipe", recipe: updatedRecipe });
                return updatedRecipe;
            })
        }

    },
    modules: {},
});