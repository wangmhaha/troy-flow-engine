/*
 * @Descripttion:
 * @version:
 * @Author: wangmin
 * @Date: 2025-04-28 14:18:47
 * @LastEditors: wangmin
 * @LastEditTime: 2025-04-28 14:24:27
 */
import { CircleNode, CircleNodeModel, h } from "@logicflow/core";
import { nodeStyleHandle } from "../tool";

class EndModel extends CircleNodeModel {
  static extendKey = "EndModel";
  constructor(data, graphModel) {
    if (!data.text) {
      data.text = "";
    }
    if (data.text && typeof data.text === "string") {
      data.text = {
        value: data.text,
        x: data.x,
        y: data.y + 40,
      };
    }
    super(data, graphModel);
  }

  setAttributes() {
    this.r = 28;
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
    return nodeStyleHandle(this, style);
  }
}

class EndView extends CircleNode {
  static extendKey = "EndView";
  getAnchorStyle() {
    return {
      visibility: "hidden",
    };
  }

  getShape() {
    const { model } = this.props;
    const style = model.getNodeStyle();
    style.fill = "#ddd";
    const { x, y, r } = model;
    const outCircle = super.getShape();
    return h(
      "g",
      {},
      outCircle,
      h("circle", {
        ...style,
        cx: x,
        cy: y,
        r: r - 5,
      })
    );
  }
}

const End = {
  type: "node:end",
  view: EndView,
  model: EndModel,
};

export { EndView, EndModel };
export default End;
