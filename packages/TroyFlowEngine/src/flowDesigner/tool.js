/*
 * @Descripttion:
 * @version:
 * @Author: wangmin
 * @Date: 2025-04-28 13:35:38
 * @LastEditors: wangmin
 * @LastEditTime: 2025-04-28 13:35:54
 */
export const nodeStyleHandle = (_this, style) => {
  if (_this.properties.state === "active") {
    style.stroke = "#00ff00";
  } else if (_this.properties.state === "history") {
    style.stroke = "#ff0000";
  }
  return style;
};
