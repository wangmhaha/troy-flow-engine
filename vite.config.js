/*
 * @Descripttion:
 * @version:
 * @Author: wangmin
 * @Date: 2025-04-27 15:03:16
 * @LastEditors: wangmin
 * @LastEditTime: 2025-05-06 16:56:28
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "lib") {
    return {
      plugins: [vue()],
      build: {
        lib: {
          entry: resolve(__dirname, "packages/index.js"), // 你的库的入口文件
          name: "TroyFlowEngine", // 暴露的全局变量
          fileName: "troy-flow-engine",
          // formats: ["es", "umd"], // 输出的格式
        },
        cssCodeSplit: false,
        rollupOptions: {
          // 确保外部化处理那些你不想打包进库的依赖
          external: ["vue", "element-plus", "@element-plus/icons-vue"],
          output: {
            // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
            globals: {
              vue: "Vue",
              "element-plus": "ElementPlus",
              "@element-plus/icons-vue": "ElementPlusIconsVue",
            },
          },
        },
      },
    };
  }

  // 默认配置
  return {
    plugins: [vue()],
  };
});
