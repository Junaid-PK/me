import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

// Polyfill for Buffer (needed for gray-matter)
import { Buffer } from 'buffer'
window.Buffer = Buffer

createApp(App).use(router).mount("#app");
