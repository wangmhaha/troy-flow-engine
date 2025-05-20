/*
 * @Descripttion:
 * @version:
 * @Author: wangmin
 * @Date: 2025-04-28 14:40:39
 * @LastEditors: wangmin
 * @LastEditTime: 2025-05-20 14:09:41
 */
import { h, RectNode, RectNodeModel } from "@logicflow/core";
import { nodeStyleHandle } from "../tool";

class JoinModel extends RectNodeModel {
  static extendKey = "JoinModel";
  constructor(data, graphModel) {
    if (!data.text) {
      data.text = "合并";
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

class JoinView extends RectNode {
  static extendKey = "JoinNode";
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
        d: "M6.54736 6.96983C6.56692 6.96005 9.62726 6.98942 9.62726 6.98942L11.7155 10.3827L11.0368 11.505L9.03356 8.25211H6.56694C6.56694 8.25211 5.8328 7.61588 6.54736 6.96983ZM19.7287 11.7399L16.4824 9.47561L16.4922 11.0613H13.0467L10.5018 15.7597C10.5018 15.7597 6.78228 15.7467 6.76911 15.7467C5.85573 16.4578 6.76911 17.0126 6.76911 17.0126L11.0695 17.006L13.5297 12.3142L16.5182 12.3404V13.8542L19.7287 11.7399Z",
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

const Join = {
  type: "node:join",
  view: JoinView,
  model: JoinModel,
};

export { JoinView, JoinModel };
export default Join;
