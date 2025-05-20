/*
 * @Descripttion:
 * @version:
 * @Author: wangmin
 * @Date: 2025-04-28 14:18:47
 * @LastEditors: wangmin
 * @LastEditTime: 2025-05-20 14:14:43
 */
import { RectNode, RectNodeModel, h } from "@logicflow/core";
import { nodeStyleHandle } from "../tool";

class EndModel extends RectNodeModel {
  static extendKey = "EndModel";
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
    this.width = 120;
    this.height = 60;
  }

  // 自定义文本样式
  getTextStyle() {
    const style = super.getTextStyle();
    style.textAlign = "center";
    style.fontSize = 12;
    return style;
  }

  getConnectedSourceRules() {
    const rules = super.getConnectedSourceRules();
    const notAsSource = {
      message: "结束节点不能作为边的起点",
      validate: () => false,
    };
    rules.push(notAsSource);
    return rules;
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
}

class EndView extends RectNode {
  static extendKey = "EndView";
  getAnchorStyle() {
    return {
      visibility: "hidden",
    };
  }

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
        fill: "#FF4C51",
        d: "M11 0.57735C11.6188 0.220084 12.3812 0.220085 13 0.57735L21.3923 5.42265C22.0111 5.77992 22.3923 6.44017 22.3923 7.1547V16.8453C22.3923 17.5598 22.0111 18.2201 21.3923 18.5774L13 23.4226C12.3812 23.7799 11.6188 23.7799 11 23.4226L2.6077 18.5774C1.98889 18.2201 1.6077 17.5598 1.6077 16.8453V7.1547C1.6077 6.44017 1.98889 5.77992 2.6077 5.42265L11 0.57735Z",
      }),
      h("rect", {
        x: 8,
        y: 8,
        width: 8,
        height: 8,
        fill: "#fff",
        rx: 2,
      })
    );
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
        width,
        height,
      }),
      // 左侧图标
      this.getLabelShape(),
    ]);
  }
}

const End = {
  type: "node:end",
  view: EndView,
  model: EndModel,
};

export { EndView, EndModel };
export default End;
