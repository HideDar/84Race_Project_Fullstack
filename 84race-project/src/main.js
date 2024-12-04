import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import { ToastifyContainer} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';



const app = createApp(App);
app.use(store);
app.use(router);
app.component('ToastifyContainer', ToastifyContainer);
app.mount('#app');


