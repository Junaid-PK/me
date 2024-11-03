import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Blogs from "../pages/Blogs.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/blog", component: Blogs },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
