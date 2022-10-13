import { createRouter, createWebHashHistory } from "vue-router";
import MainPage from "@/views/MainPage.vue";
import ListPosts from "@/views/ListPosts.vue";
import ListUsers from "@/views/ListUsers.vue";
import PostPage from "@/views/PostPage.vue";
import UserPage from "@/views/UserPage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: MainPage,
  },
  {
    path: "/posts/:id",
    name: "post",
    component: PostPage,
  },
  {
    path: "/users/:id",
    name: "user",
    component: UserPage,
  },
  {
    path: "/users",
    name: "users",
    component: ListUsers,
  },
  {
    path: "/posts",
    name: "posts",
    component: ListPosts,
  },
  { name: "not-found", component: NotFoundPage, path: "/:pathMatch(.*)*" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
