import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import recipeDetails from '../views/recipe-details.vue';
import recipeEdit from '../views/save-edit.vue';
import profileUser from '../views/profile.vue';
import signLogin from '../components/login-signup.vue'

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: '/recipe/edit/:recipeId?',
        name: "recipeEdit",
        component: recipeEdit
    },
    {
        path: '/recipe/:recipeId?',
        // name: "RecipeDetails",
        component: recipeDetails
    },
    {
        path: '/user/:userId?',
        component: profileUser
    }, {
        path: '/login',
        component: signLogin
    }

];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;