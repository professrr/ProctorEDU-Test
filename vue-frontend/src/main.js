import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LoadScript from 'vue-plugin-load-script';

// https://demo.proctoring.online/sdk/supervisor.js


createApp(App)
    .use(router)
    .use(store)
    .use(LoadScript)
    .mount('#app');