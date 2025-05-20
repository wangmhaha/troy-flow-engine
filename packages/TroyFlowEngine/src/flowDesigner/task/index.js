/*
 * @Descripttion:
 * @version:
 * @Author: wangmin
 * @Date: 2025-04-28 13:32:53
 * @LastEditors: wangmin
 * @LastEditTime: 2025-05-20 11:50:23
 */
import { h, RectNode, RectNodeModel } from "@logicflow/core";
import { nodeStyleHandle } from "../tool";

class TaskModel extends RectNodeModel {
  static extendKey = "TaskModel";
  constructor(data, graphModel) {
    if (!data.text) {
      data.text = "";
    }
    if (data.text && typeof data.text === "string") {
      data.text = {
        value: data.text,
        x: data.x,
        y: data.y,
      };
    }
    super(data, graphModel);
    this.width = 150;
    this.height = 60;
  }

  getNodeStyle() {
    const style = super.getNodeStyle();
    const customStyle = nodeStyleHandle(this, style);
    // 设置节点的基本样式
    customStyle.fill = "#fff";
    customStyle.stroke = "#E8E8EF";
    customStyle.strokeWidth = 1;

    return customStyle;
  }
}

class TaskView extends RectNode {
  static extendKey = "TaskNode";

  // 渲染左侧图标
  getLabelShape() {
    const { model } = this.props;
    const { x, y, width, height } = model;

    return h(
      "svg",
      {
        x: x - width / 2 + 5,
        y: y - height / 2 + 5,
        width: 24,
        height: 24,
        viewBox: "0 0 24 24",
      },
      h("path", {
        fill: "#56CA00",
        d: "M11 0.57735C11.6188 0.220084 12.3812 0.220085 13 0.57735L21.3923 5.42265C22.0111 5.77992 22.3923 6.44017 22.3923 7.1547V16.8453C22.3923 17.5598 22.0111 18.2201 21.3923 18.5774L13 23.4226C12.3812 23.7799 11.6188 23.7799 11 23.4226L2.6077 18.5774C1.98889 18.2201 1.6077 17.5598 1.6077 16.8453V7.1547C1.6077 6.44017 1.98889 5.77992 2.6077 5.42265L11 0.57735Z",
      }),
      h("path", {
        fill: "#fff",
        d: "M14.9857 14.0024C14.6268 13.8744 14.112 13.8299 13.7836 13.7576C13.5944 13.7158 13.319 13.6101 13.2271 13.5016C13.1353 13.3903 13.191 12.3635 13.191 12.3635C13.191 12.3635 13.3607 12.0963 13.4525 11.8626C13.5443 11.6289 13.6445 10.9889 13.6445 10.9889C13.6445 10.9889 13.8337 10.9889 13.9005 10.6577C13.9729 10.296 14.0842 10.1457 14.0703 9.87582C14.0563 9.62539 13.9256 9.61147 13.9116 9.61147C13.9116 9.61147 14.048 9.23304 14.0675 8.43165C14.0897 7.48278 13.3635 6.54782 12 6.54782C10.6365 6.54782 9.91304 7.47999 9.93252 8.42886C9.94921 9.22747 10.0883 9.60869 10.0883 9.60869C10.0744 9.60869 9.94365 9.6226 9.92973 9.87304C9.91582 10.143 10.0299 10.2876 10.0995 10.6494C10.1663 10.9805 10.3555 10.9833 10.3555 10.9833C10.3555 10.9833 10.4556 11.6261 10.5475 11.8598C10.6393 12.0963 10.809 12.3607 10.809 12.3607C10.809 12.3607 10.8647 13.3875 10.7729 13.4988C10.681 13.6101 10.4056 13.713 10.2163 13.7548C9.88521 13.8271 9.37321 13.8744 9.01426 14.0024C8.6553 14.1304 7.54782 14.5617 7.54782 15.4522H16.4522C16.4522 14.5617 15.3447 14.1304 14.9857 14.0024Z",
      })
    );
  }

  // 渲染底部蓝色边框
  getBottomBorderShape() {
    const { model } = this.props;
    const { x, y, width, height } = model;

    return h("rect", {
      x: x - width / 2,
      y: y + height / 2 - 4,
      width,
      height: 4,
      fill: "#1890FF", // 蓝色底部边框
    });
  }

  getShape() {
    const { model } = this.props;
    const { x, y, width, height } = model;
    const style = model.getNodeStyle();

    return h("g", {}, [
      // 主矩形
      h("rect", {
        ...style,
        x: x - width / 2,
        y: y - height / 2,
        rx: 4,
        ry: 4,
        width,
        height,
      }),
      // 底部蓝色边框
      this.getBottomBorderShape(),
      // 左侧图标
      this.getLabelShape(),
    ]);
  }
}

const Task = {
  type: "node:task",
  view: TaskView,
  model: TaskModel,
};

export default Task;
