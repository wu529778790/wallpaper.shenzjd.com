import { createRouter, createWebHashHistory } from "vue-router";
import { h } from "vue";
import { IeOutlined, InstagramOutlined } from "@ant-design/icons-vue";

export const routes = [
  {
    path: "/",
    component: () => import("@/views/index.vue"),
    meta: {
      title: "壁纸",
      icon: () => h(InstagramOutlined),
      newPage: true,
    },
    redirect: "/index",
    children: [
      {
        path: "/index",
        component: () => import("@/views/index/index.vue"),
        meta: {
          title: "最新壁纸",
          menu: false,
        },
      },
      {
        path: "/bing",
        component: () => import("@/views/bing/index.vue"),
        meta: {
          title: "必应壁纸",
          menu: false,
        },
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export function setupRouter(app) {
  app.use(router);
}
