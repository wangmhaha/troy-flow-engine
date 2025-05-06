/*
 * @Descripttion:
 * @version:
 * @Author: wangmin
 * @Date: 2025-04-27 15:03:16
 * @LastEditors: wangmin
 * @LastEditTime: 2025-04-27 15:47:36
 */
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./style.css";
import App from "./App.vue";
import { TroyFlowEngine } from "../packages";

const app = createApp(App);

app.use(TroyFlowEngine);
app.use(ElementPlus);
app.mount("#app");
