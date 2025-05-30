/*
 * @Descripttion:
 * @version:
 * @Author: wangmin
 * @Date: 2025-04-28 14:14:03
 * @LastEditors: wangmin
 * @LastEditTime: 2025-05-20 11:49:26
 */
import { h, RectNode, RectNodeModel } from "@logicflow/core";
import { nodeStyleHandle } from "../tool";

class DecisionModel extends RectNodeModel {
  static extendKey = "DecisionModel";
  constructor(data, graphModel) {
    if (!data.text) {
      data.text = "条件判断";
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

class DecisionView extends RectNode {
  static extendKey = "DecisionNode";

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
        d: "M17.7999 11.5168C17.928 11.6449 18 11.8188 18 12C18 12.1812 17.928 12.3551 17.7999 12.4832L12.4838 17.7999C12.3556 17.928 12.1818 18 12.0005 18C11.8193 18 11.6454 17.928 11.5173 17.7999L6.20013 12.4832C6.07199 12.3551 6 12.1812 6 12C6 11.8188 6.07199 11.6449 6.20013 11.5168L11.5169 6.20012C11.6451 6.07198 11.8189 6 12.0002 6C12.1814 6 12.3552 6.07198 12.4834 6.20012L17.8002 11.5168H17.7999ZM13.6919 14.6578L12.0002 12.9665L10.3088 14.6581L12.0002 16.3491L13.6916 14.6575L13.6919 14.6578ZM11.0337 12L9.34195 10.3083L7.65022 12L9.34229 13.691L11.0337 12ZM12.0002 7.65018L10.3084 9.34185L12.0002 11.0335L13.6919 9.34185L12.0002 7.64983V7.65018ZM14.6584 10.3083L12.9667 12L14.6584 13.6913L16.3501 11.9997L14.6584 10.3083Z",
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

const Decision = {
  type: "node:decision",
  view: DecisionView,
  model: DecisionModel,
};

export { DecisionView, DecisionModel };
export default Decision;
