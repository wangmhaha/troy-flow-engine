/*
 * @Descripttion:
 * @version:
 * @Author: wangmin
 * @Date: 2025-04-28 14:40:39
 * @LastEditors: wangmin
 * @LastEditTime: 2025-04-28 14:40:53
 */
import { h, PolygonNode, PolygonNodeModel } from "@logicflow/core";
import { nodeStyleHandle } from "../tool";

class JoinModel extends PolygonNodeModel {
  static extendKey = "JoinModel";
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

class JoinView extends PolygonNode {
  static extendKey = "JoinNode";
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
          d: "M792.149333 554.666667h-280.448L375.893333 749.226667c-8.106667 11.093333-21.333333 17.92-34.986666 18.346666L341.333333 768H128c-23.893333 0-42.666667-19.2-42.666667-42.666667 0-23.893333 18.773333-42.666667 42.666667-42.666666h191.146667l119.296-170.922667L319.146667 341.333333H128c-23.893333 0-42.666667-19.2-42.666667-42.666666 0-23.893333 18.773333-42.666667 42.666667-42.666667h213.333333c13.653333 0 26.88 6.826667 34.986667 18.346667L512 469.333333h281.002667L737.28 413.866667v-0.426667a42.24 42.24 0 0 1 0-60.586667 42.24 42.24 0 0 1 60.586667 0l128 128c5.674667 5.546667 9.429333 12.416 11.221333 19.712a42.752 42.752 0 0 1-19.328 48.042667l-120.32 120.362667c-8.106667 7.68-19.2 12.373333-30.293333 12.373333L768 682.666667c-11.52 0-22.613333-4.693333-30.293333-12.373334a42.624 42.624 0 0 1-0.426667-60.586666v-0.426667L792.149333 554.666667z",
        })
      )
    );
  }
}

const Join = {
  type: "node:join",
  view: JoinView,
  model: JoinModel,
};

export { JoinView, JoinModel };
export default Join;
