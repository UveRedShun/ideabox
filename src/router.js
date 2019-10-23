import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home/Home.vue';
import Login from './views/home/Login.vue';
import Register from './views/home/Register.vue';
import Index from './views/users/Index.vue';
import Show from './views/users/Show.vue';
import Edit from './views/users/Edit.vue';
import IdeasIndex from './views/ideas/Index.vue';
import IdeasShow from './views/ideas/Show.vue';
import IdeasEdit from './views/ideas/Edit.vue';


Vue.use(Router)

export default new Router({
    routes: [
        {path: "/", component: Home},
        {path: "/login", component: Login},
        {path: "/registration", component: Register},
        {path: "/users", component: Index},
        {path: "/users/:id", component: Show},
        {path: "/users/:id/edit", component: Edit},
        {path: "/ideas", component: IdeasIndex},
        {path: "/ideas/:id", component: IdeasShow},
        {path: "/ideas/:id/edit", component: IdeasEdit},
    ]
});