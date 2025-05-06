/*
 * @Descripttion:
 * @version:
 * @Author: wangmin
 * @Date: 2025-04-27 15:20:39
 * @LastEditors: wangmin
 * @LastEditTime: 2025-05-06 15:05:14
 */
import TroyFlowEngine from "./TroyFlowEngine/src/flowDesigner/index.js";

// 导入样式
import "./style/index.css";

// 存储组件列表
const components = [TroyFlowEngine];

// 定义 install 方法，接收 app 作为参数
const install = (app) => {
  app.component("troy-flow-engine", TroyFlowEngine);
};

// 导出插件对象
export default {
  install,
};

// 导出单个组件
export { TroyFlowEngine };
