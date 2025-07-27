import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Blogs from "../pages/Blogs.vue";
import BlogPost from "../pages/BlogPost.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/blog", component: Blogs },
  { path: "/blog/:slug", component: BlogPost },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
