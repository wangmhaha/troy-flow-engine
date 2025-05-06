/*
 * @Descripttion:
 * @version:
 * @Author: wangmin
 * @Date: 2025-04-28 14:42:10
 * @LastEditors: wangmin
 * @LastEditTime: 2025-04-28 14:54:54
 */
import { GroupNode, GroupNodeModel } from "@logicflow/extension";

class SubProcessView extends GroupNode {}
class SubProcessModel extends GroupNodeModel {
  constructor(data, graphModel) {
    if (!data.text) {
      data.text = "";
    }
    if (data.text && typeof data.text === "string") {
      data.text = {
        value: data.text,
        x: data.x,
        y: data.y + 120,
      };
    }
    super(data, graphModel);
  }
  initNodeData(data) {
    super.initNodeData(data);
    this.isRestrict = true;
    this.resizable = true;
    this.foldable = false;
    this.width = 300;
    this.height = 200;
    this.foldedWidth = 50;
    this.foldedHeight = 50;
    this.radius = 10;
  }
}

const SubProcess = {
  type: "node:subProcess",
  view: SubProcessView,
  model: SubProcessModel,
};

export { SubProcess, SubProcessModel };
export default SubProcess;
