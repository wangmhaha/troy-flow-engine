/*
 * @Descripttion:
 * @version:
 * @Author: wangmin
 * @Date: 2025-04-28 14:29:50
 * @LastEditors: wangmin
 * @LastEditTime: 2025-04-28 14:39:29
 */
import { h, PolygonNode, PolygonNodeModel } from "@logicflow/core";
import { nodeStyleHandle } from "../tool";

class ForkModel extends PolygonNodeModel {
  static extendKey = "ForkModel";
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
    this.points = [
      [25, 0],
      [50, 25],
      [25, 50],
      [0, 25],
    ];
  }

  getNodeStyle() {
    const style = super.getNodeStyle();
    return nodeStyleHandle(this, style);
  }
}

class ForkView extends PolygonNode {
  static extendKey = "ForkNode";
  getShape() {
    const { model } = this.props;
    const { x, y, width, height, points } = model;
    const style = model.getNodeStyle();
    return h(
      "g",
      {
        transform: `matrix(1 0 0 1 ${x - width / 2} ${y - height / 2})`,
      },
      h("polygon", {
        ...style,
        x,
        y,
        points,
      }),
      h(
        "svg",
        {
          x: (width - 28) / 2,
          y: (height - 28) / 2,
          width: 28,
          height: 28,
          viewBox: "0 0 1024 1024",
        },
        h("path", {
          fill: style.stroke,
          d: "M779.733333 64c2.474667 0 4.864 0.768 6.826667 2.176l192.042667 137.173333a11.733333 11.733333 0 0 1 0 19.114667l-192 137.173333A11.733333 11.733333 0 0 1 768 350.08L767.957333 256h-237.994666c-6.826667 0-14.250667 7.466667-15.786667 18.901333l-0.298667 4.48v465.237334c0 12.373333 6.613333 21.248 13.482667 23.04l2.56 0.341333H768L768 674.346667a11.733333 11.733333 0 0 1 18.56-9.557334l192.042667 137.173334a11.733333 11.733333 0 0 1 0 19.114666l-192 137.173334a11.733333 11.733333 0 0 1-18.602667-9.557334L767.957333 853.333333h-237.994666c-54.912 0-97.877333-45.824-101.205334-101.717333l-0.213333-6.997333L428.501333 554.666667H291.370667a128.042667 128.042667 0 1 1 0-85.333334h137.130666V279.381333c0-56.618667 40.789333-104.704 94.677334-108.458666L529.92 170.666667h237.994667L768 75.733333c0-6.485333 5.248-11.733333 11.733333-11.733333z",
        })
      )
    );
  }
}

const Fork = {
  type: "node:fork",
  view: ForkView,
  model: ForkModel,
};

export { ForkView, ForkModel };
export default Fork;
