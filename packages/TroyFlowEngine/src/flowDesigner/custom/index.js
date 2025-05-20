/*
 * @Descripttion:
 * @version:
 * @Author: wangmin
 * @Date: 2025-04-28 14:25:52
 * @LastEditors: wangmin
 * @LastEditTime: 2025-05-20 14:01:19
 */
import { h, RectNodeModel, RectNode } from "@logicflow/core";
import { nodeStyleHandle } from "../tool";

class CustomModel extends RectNodeModel {
  static extendKey = "CustomModel";
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
    customStyle.strokeWidth = 2;

    return customStyle;
  }
}

class CustomView extends RectNode {
  static extendKey = "CustomNode";
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
        d: "M12.1755 9.34329C12.1214 9.31491 12.0611 9.30008 12 9.30008C11.9389 9.30008 11.8786 9.31491 11.8245 9.34329L8.8248 10.9273C8.76476 10.9594 8.7145 11.0071 8.67933 11.0654C8.64416 11.1237 8.62539 11.1904 8.625 11.2585V14.3689C8.625 14.5075 8.7024 14.6353 8.8248 14.7001L11.8254 16.2841C11.8794 16.3123 11.9395 16.3271 12.0004 16.3271C12.0614 16.3271 12.1215 16.3123 12.1755 16.2841L15.1752 14.7001C15.2352 14.668 15.2855 14.6203 15.3207 14.562C15.3558 14.5037 15.3746 14.437 15.375 14.3689V11.2585C15.3749 11.1901 15.3563 11.123 15.3211 11.0644C15.2859 11.0057 15.2355 10.9577 15.1752 10.9255L12.1755 9.34329Z",
      }),
      h("path", {
        fill: "#fff",
        d: "M12.1872 8.68809C12.6844 8.68809 13.1612 8.49058 13.5128 8.139C13.8644 7.78743 14.0619 7.31059 14.0619 6.81339C14.0619 6.31619 13.8644 5.83935 13.5128 5.48778C13.1612 5.1362 12.6844 4.93869 12.1872 4.93869C11.69 4.93869 11.2132 5.1362 10.8616 5.48778C10.51 5.83935 10.3125 6.31619 10.3125 6.81339C10.3125 7.31059 10.51 7.78743 10.8616 8.139C11.2132 8.49058 11.69 8.68809 12.1872 8.68809ZM6.5622 17.6881C7.0594 17.6881 7.53624 17.4906 7.88781 17.139C8.23939 16.7874 8.4369 16.3106 8.4369 15.8134C8.4369 15.3162 8.23939 14.8394 7.88781 14.4878C7.53624 14.1362 7.0594 13.9387 6.5622 13.9387C6.065 13.9387 5.58816 14.1362 5.23659 14.4878C4.88501 14.8394 4.6875 15.3162 4.6875 15.8134C4.6875 16.3106 4.88501 16.7874 5.23659 17.139C5.58816 17.4906 6.065 17.6881 6.5622 17.6881ZM17.8122 17.6881C18.3094 17.6881 18.7862 17.4906 19.1378 17.139C19.4894 16.7874 19.6869 16.3106 19.6869 15.8134C19.6869 15.3162 19.4894 14.8394 19.1378 14.4878C18.7862 14.1362 18.3094 13.9387 17.8122 13.9387C17.315 13.9387 16.8382 14.1362 16.4866 14.4878C16.135 14.8394 15.9375 15.3162 15.9375 15.8134C15.9375 16.3106 16.135 16.7874 16.4866 17.139C16.8382 17.4906 17.315 17.6881 17.8122 17.6881Z",
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
    const { x, y, width, height, radius } = model;
    const style = model.getNodeStyle();
    return h("g", {}, [
      h("rect", {
        x: x - width / 2,
        y: y - height / 2,
        rx: 10,
        ry: 10,
        width,
        height,
        ...style,
      }),
      this.getBottomBorderShape(),
      this.getLabelShape(),
    ]);
  }
}

const Custom = {
  type: "node:custom",
  view: CustomView,
  model: CustomModel,
};

export { CustomView, CustomModel };
export default Custom;
