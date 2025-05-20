/*
 * @Descripttion:
 * @version:
 * @Author: wangmin
 * @Date: 2025-04-28 14:14:03
 * @LastEditors: wangmin
 * @LastEditTime: 2025-05-20 14:04:26
 */
import { h, RectNode, RectNodeModel } from "@logicflow/core";
import { nodeStyleHandle } from "../tool";

class ForkModel extends RectNodeModel {
  static extendKey = "ForkModel";
  constructor(data, graphModel) {
    if (!data.text) {
      data.text = "分支";
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
    customStyle.strokeWidth = 2;

    return customStyle;
  }

  // 自定义文本样式
  getTextStyle() {
    const style = super.getTextStyle();
    style.textAlign = "center";
    style.fontSize = 12;
    return style;
  }
}

class ForkView extends RectNode {
  static extendKey = "ForkNode";

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
        fill: "#FFB400",
        d: "M11 0.57735C11.6188 0.220084 12.3812 0.220085 13 0.57735L21.3923 5.42265C22.0111 5.77992 22.3923 6.44017 22.3923 7.1547V16.8453C22.3923 17.5598 22.0111 18.2201 21.3923 18.5774L13 23.4226C12.3812 23.7799 11.6188 23.7799 11 23.4226L2.6077 18.5774C1.98889 18.2201 1.6077 17.5598 1.6077 16.8453V7.1547C1.6077 6.44017 1.98889 5.77992 2.6077 5.42265L11 0.57735Z",
      }),
      h("path", {
        fill: "#fff",
        d: "M9.73668 15.14C10.1724 15.3127 10.5337 15.633 10.7575 16.0449C10.9812 16.4568 11.0532 16.9342 10.9609 17.3938C10.8686 17.8534 10.6179 18.266 10.2524 18.5596C9.887 18.8531 9.43008 19.0091 8.96141 19.0002C8.49274 18.9913 8.04207 18.8181 7.68805 18.5108C7.33404 18.2036 7.09915 17.7818 7.02437 17.319C6.9496 16.8563 7.03968 16.3819 7.27892 15.9788C7.51815 15.5757 7.89133 15.2694 8.33335 15.1133V10.8867C7.88835 10.7294 7.51329 10.4199 7.27444 10.0128C7.0356 9.60573 6.94836 9.12733 7.02814 8.66215C7.10792 8.19697 7.34959 7.77498 7.71043 7.47076C8.07127 7.16654 8.52805 6.99968 9.00002 6.99968C9.47198 6.99968 9.92876 7.16654 10.2896 7.47076C10.6504 7.77498 10.8921 8.19697 10.9719 8.66215C11.0517 9.12733 10.9644 9.60573 10.7256 10.0128C10.4867 10.4199 10.1117 10.7294 9.66668 10.8867V13C10.224 12.5813 10.916 12.3333 11.6667 12.3333H14.3333C14.7721 12.3334 15.1987 12.1892 15.5474 11.9229C15.8961 11.6567 16.1477 11.2832 16.2633 10.86C15.8255 10.6866 15.4628 10.3643 15.2392 9.9498C15.0156 9.53531 14.9453 9.05522 15.0409 8.59404C15.1364 8.13287 15.3916 7.72018 15.7614 7.42864C16.1313 7.13709 16.5922 6.98537 17.0629 7.0002C17.5337 7.01503 17.9841 7.19544 18.3349 7.50969C18.6857 7.82393 18.9143 8.25186 18.9807 8.71813C19.047 9.1844 18.9467 9.65913 18.6974 10.0587C18.4482 10.4583 18.0659 10.7572 17.618 10.9027C17.4836 11.6764 17.0805 12.3779 16.4796 12.8835C15.8787 13.3891 15.1187 13.6665 14.3333 13.6667H11.6667C11.2279 13.6667 10.8014 13.8109 10.4526 14.0771C10.1039 14.3433 9.85232 14.7168 9.73668 15.14Z",
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

const Fork = {
  type: "node:fork",
  view: ForkView,
  model: ForkModel,
};

export { ForkView, ForkModel };
export default Fork;
