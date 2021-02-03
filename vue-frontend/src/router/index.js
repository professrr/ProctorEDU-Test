import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Test from "@/components/Test.vue";
import Auth from "@/components/Auth.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: 'auth',
        name: 'Auth',
        component: Auth
      },
      {
        path: 'test',
        name: 'Test',
        component: Test
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;