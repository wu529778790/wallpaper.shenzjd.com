import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    component: () => import("./Layout/index.vue"),
    redirect: "/index",
    children: [
      {
        path: "/index",
        component: () => import("@/views/index/index.vue"),
      },
      {
        path: "/bing",
        component: () => import("@/views/bing/index.vue"),
      },
      {
        path: "/english",
        component: () => import("@/views/english/index.vue"),
      },
      {
        path: "/simplevitualList",
        component: () => import("@/views/simplevitualList/index.vue"),
      },
    ],
  },
  {
    path: "/vitualList",
    component: () => import("@/views/vitualList/index.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export function setupRouter(app) {
  app.use(router);
}
