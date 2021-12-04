import { userService } from '@/services/user-service.js'
import { LayoutPlugin } from 'bootstrap-vue';

export const userStore = {
    state: {
        user: userService._createUser()
    },
    getters: {
        user(state) {
            return state.user;
        },

    },
    mutations: {
        setUser(state, { savedUser }) {
            state.user = savedUser;
        }
    },
    actions: {
        async saveUser({ commit }, { user }) {
            try {
                const userSaved = await userService.saveUser(user);
                commit({ type: "setUser", savedUser: userSaved });
                return userSaved;
            } catch (err) {
                console.log('cannot save user chages');
                throw err;
            }
        },
        async login({ commit }, { user }) {
            try {
                const savedUser = await userService.login(user);
                commit({ type: "setUser", savedUser });
            } catch (err) {
                console.log("error login");
            }

        },
        async signup({ commit }, { user }) {
            try {
                const savedUser = await userService.signup(user);
                commit({ type: "setUser", savedUser });
                return user;
            } catch (err) {
                throw err;
            }
        }
    }
}