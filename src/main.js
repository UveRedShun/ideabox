import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = 
    'https://firestore.googleapis.com/v1/projects/ideabox-1287b/databases/(default)/documents';

const interceptorsRequest = axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const interceptorsResponse = axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.request.eject(interceptorsRequest);
axios.interceptors.response.eject(interceptorsResponse);

store.dispatch('autoLogin')
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
