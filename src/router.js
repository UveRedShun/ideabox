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
import store from './store';

Vue.use(Router)

export default new Router({
    /* URLの＃が消える */
    mode: 'history',
    routes: [
        {path: "/", component: Home},
        {path: "/login", 
        component: Login,
            beforeEnter(to, from, next) {
                if (store.getters.idToken) {
                    next('/ideas');
                } else {
                    next();
                }
                }
        },
        {
            path: "/registration", 
            component: Register,
            beforeEnter(to, from, next) {
                if (store.getters.idToken) {
                    next('/ideas');
                } else {
                    next();
                }
            }
        },
        {path: "/users", component: Index},
        {path: "/users/:id", component: Show},
        {path: "/users/:id/edit", component: Edit},
        {
            path: "/ideas", 
            component: IdeasIndex,
            beforeEnter(to, from, next) {
                if (store.getters.idToken) {
                    next();
                } else {
                    next('/login');
                }
            }
        },
        {path: "/ideas/:id", component: IdeasShow},
        {path: "/ideas/:id/edit", component: IdeasEdit},
    ]
});