/*
 * @Descripttion:
 * @version:
 * @Author: wangmin
 * @Date: 2025-04-27 17:10:53
 * @LastEditors: wangmin
 * @LastEditTime: 2025-04-30 13:28:34
 */
import { CircleNode, CircleNodeModel } from "@logicflow/core";

class StartModel extends CircleNodeModel {
  static extendKey = "StartModel";
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
  getConnectedTargetRules() {
    const rules = super.getConnectedTargetRules();
    const notAsTarget = {
      message: "起始节点不能作为边的终点",
      validate: () => false,
    };
    rules.push(notAsTarget);
    return rules;
  }
}

class StartView extends CircleNode {
  static extendKey = "StartNode";
}

const Start = {
  type: "node:start",
  view: StartView,
  model: StartModel,
};

export { StartModel, StartView };
export default Start;
