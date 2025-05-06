<!--
 * @Descripttion:
 * @version:
 * @Author: wangmin
 * @Date: 2025-04-27 15:03:16
 * @LastEditors: wangmin
 * @LastEditTime: 2025-05-06 11:41:08
-->

# Troy 工作流引擎 web 设计器

基于 LogicFlow2, Vue3 自研流程引擎设计器

# 如何使用

## Vue3

### 安装

```bash
pnpm install troy-flow-engine@next --save
```

### 其他依赖

设计器依赖以下第三方库，如果工程中没有引入这些第三库将会无法正常使用，需自行安装。

```bash
pnpm install element-plus --save
pnpm install @element-plus/icons-vue --save
```

### 引入

```js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { TroyFlowEngine } from "troy-flow-engine";
createApp(App).use(router).use(ElementPlus).use(TroyFlowEngine).mount("#app");
```

### 编辑模式

```js
<TroyFlowEngine
  :getDeptTree="getDeptTree"
  :getUserList="getUserList"
  :getRoleList="getRoleList"
  @on-save="saveFlow"
/>

const getUserList = async (deptId, { pageNum, pageSize }) => {
  // 模拟一个请求
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: 5,
        rows: [],
        code: 200,
        msg: "查询成功",
      });
    }, 1000);
  });
  return data;
};

const getDeptTree = async () => {
  // 模拟一个请求
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 1000);
  });
  return data;
};

const getRoleList = async () => {
  // 模拟一个请求
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 1000);
  });
  return data;
};

const saveFlow = (data) => {
  console.log("data", data);
};
```

### 属性

| 参数            | 说明                 | 类型           | 可选值     | 默认值 |
| --------------- | -------------------- | -------------- | ---------- | ------ |
| value / v-model | 绑定值（json）       | string/object  | --         | --     |
| viewer          | 是否预览模式         | boolean        | true/false | false  |
| highLight       | 高亮数据，具体见下表 | object         | --         | --     |
| getDeptTree     | 获取部门树数据       | () => Promise  | --         | --     |
| getUserList     | 获取用户分页列表     | () => Promise  | --         | --     |
| getRoleList     | 获取角色列表         | () => Promise  | --         | --     |
| on-save         | 保存流程数据         | (data) => void | --         |        |
