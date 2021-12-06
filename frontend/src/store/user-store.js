import { userService } from '@/services/user-service.js'
import { LayoutPlugin } from 'bootstrap-vue';

export const userStore = {
    state: {
        user: null
    },
    getters: {
        user(state) {
            return state.user;
        },

    },
    mutations: {
        setUser(state, { savedUser }) {
            state.user = savedUser;
        },
        addRecipeUser(state, { recipe }) {
            state.user.myRecipes.push({ '_id': recipe._id, 'img': recipe.imageUrl })
            userService.saveUser(state.user);
        }
    },
    actions: {
        async saveUser({ commit }, { user }) {
            try {
                await userService.saveUser(user);
                commit({ type: "setUser", savedUser: user });
                return user;
            } catch (err) {
                console.log('cannot save user chages');
                this.$notify.error({
                    title: 'Error',
                    message: 'Cant save changes'
                });
                throw err;
            }
        },
        async login({ commit }, { user }) {
            try {
                console.log('2', user);

                const savedUser = await userService.login(user);
                commit({ type: "setUser", savedUser });
            } catch (err) {
                console.log("error login");
                this.$notify.error({
                    title: 'Error',
                    message: 'Login error'
                });
            }

        },
        async logout({ commit }) {
            try {
                await userService.logout();
                commit({ type: 'setUser', savedUser: null });
            } catch (err) {
                console.log(err);
                this.$notify.error({
                    title: 'Error',
                    message: 'Logout error'
                });
            }
        },
        async signup({ commit }, { user }) {
            try {
                const savedUser = await userService.signup(user);
                commit({ type: "setUser", savedUser });
                return user;
            } catch (err) {
                this.$notify.error({
                    title: 'Error',
                    message: 'Sign-up error'
                });
                throw err;
            }
        },
        async addRecipeToUser({ commit }, { recipe }) {
            try {
                commit({ type: 'addRecipeUser', recipe })
            } catch (err) {
                this.$notify.error({
                    title: 'Error',
                    message: 'Error save changes'
                });
                throw err;
            }
        },
        async removeRecipeFromUser({ commit, dispatch, getters }, { recipeId }) {
            try {
                const user = JSON.parse(JSON.stringify(getters.user));
                const idx = user.myRecipes.findIndex(recipe => {
                    return recipe._id == recipeId;
                })
                user.myRecipes.splice(idx, 1);
                await dispatch({ type: 'saveUser', user });
            } catch (err) {
                this.$notify.error({
                    title: 'Error',
                    message: 'Error save changes'
                });
                throw err;
            }
        }
    }
}