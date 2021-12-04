import Vue from "vue";
import Vuex from "vuex";

import { userStore } from './user-store.js'
import { recipesStore } from './recipes-store.js'

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
        userStore,
        recipesStore
    }

})