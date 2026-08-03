import type { RouteRecordRaw } from "vue-router";
import BlogPost from "../pages/BlogPost.vue";
import Blogs from "../pages/Blogs.vue";
import Home from "../pages/Home.vue";

export const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: Home },
  { path: "/blog", name: "blog", component: Blogs },
  { path: "/blog/:slug", name: "blog-post", component: BlogPost },
];
