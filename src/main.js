import { createApp } from "vue";
import { createPinia } from "pinia";
import VueSmoothScroll from "vue3-smooth-scroll";
import App from "./App.vue";
// import './assets/main.css'
import "./styles/style.scss";
const app = createApp(App);
app.use(VueSmoothScroll);
app.use(createPinia());
app.mount("#app");
