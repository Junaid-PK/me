import type { RouteRecordRaw } from "vue-router";
import AboutPage from "../pages/AboutPage.vue";
import BlogPost from "../pages/BlogPost.vue";
import Blogs from "../pages/Blogs.vue";
import Home from "../pages/Home.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";

export const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: Home },
  { path: "/about", name: "about", component: AboutPage },
  { path: "/blog", name: "blog", component: Blogs },
  { path: "/blog/:slug", name: "blog-post", component: BlogPost },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFoundPage },
];
