import { createApp } from "vue";
import { setupRouter } from "@/router";
import Antd from "ant-design-vue";
import App from "./App.vue";
import "./style.css";
import "ant-design-vue/dist/reset.css";

const app = createApp(App);

// 配置路由
setupRouter(app);
// 配置 Antd
app.use(Antd);

app.mount("#app");
