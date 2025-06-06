<!--
 * @Descripttion: 
 * @version: 
 * @Author: wangmin
 * @Date: 2025-04-27 15:21:23
 * @LastEditors: wangmin
 * @LastEditTime: 2025-05-20 14:43:07
-->
<template>
  <div class="m-troyflow-designer">
    <div
      id="TROY-view"
      :style="{ width: isReadOnly ? '100%' : 'calc(100% - 450px)' }"
    />
    <div class="property-plane" v-if="!isReadOnly">
      <PropertySetting
        :nodeData="currentClickNodeData"
        @changeNodeData="changeNodeData"
        :getDeptTree="getDeptTree"
        :getUserList="getUserList"
        :getRoleList="getRoleList"
        :getFormList="getFormList"
        :lf="lf"
      />
    </div>
  </div>
  <el-dialog v-model="dialogVisible" :title="dialogTitle" width="60%">
    <DataDetail :data="graphData" v-if="dialogType === 'DataDetail'" />
    <template #footer v-if="dialogType === 'DataDetail'">
      <el-button type="primary" class="m-btn-copy" @click="copyJsonContent"
        >复制JSON</el-button
      >
      <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, onMounted, watch } from "vue";
import LogicFlow from "@logicflow/core";
import {
  Snapshot,
  DndPanel,
  SelectionSelect,
  Menu,
  Control,
  Group,
  ProximityConnect,
} from "@logicflow/extension";
import { ElMessage } from "element-plus";
import PropertySetting from "../propertySetting/index.vue";
import Start from "./start";
import Task from "./task";
import Decision from "./decision";
import End from "./end";
import CustomNode from "./custom";
import ForkNode from "./fork";
import JoinNode from "./join";
import SubProcess from "./subProcess";
import DataDetail from "./control/dataDetail.vue";
import "@logicflow/core/lib/style/index.css";
import "@logicflow/extension/lib/style/index.css";

// 使用 name 属性定义组件名称
const name = "troy-flow-engine";

const emit = defineEmits(["on-save"]);

const props = defineProps([
  "value",
  "config",
  "viewer",
  "getDeptTree",
  "getUserList",
  "getRoleList",
  "getFormList",
  "isReadOnly",
]);
// 当前流程实例对象
const lf = ref(null);
// 点击流程节点，该节点数据
const currentClickNodeData = ref(null);
// 查看，导入弹窗控制
const dialogVisible = ref(false);
// 弹窗标题
const dialogTitle = ref("");
// 流程数据类型
const dialogType = ref("DataDetail");
// 当前流程图数据
const graphData = ref({});

// 复制JSON内容
const copyJsonContent = () => {
  // 复制JSON到剪贴板
  if (dialogType.value === "DataDetail" && lf.value) {
    const json = JSON.stringify(graphData.value, null, 2);
    navigator.clipboard
      .writeText(json)
      .then(() => {
        ElMessage({
          message: "复制成功",
          type: "success",
        });
      })
      .catch((err) => {
        console.error("复制失败:", err);
        ElMessage({
          message: "复制失败",
          type: "error",
        });
      });
  }
};
// 初始化流程引擎
const initFlowDesigner = () => {
  lf.value = new LogicFlow({
    container: document.querySelector("#TROY-view"),
    plugins: props.isReadOnly
      ? []
      : [Menu, Control, Snapshot, DndPanel, SelectionSelect, Group],
    isSilentMode: false,
    grid: true,
  });

  // 注册自定义元素
  registerCustomNode();
  if (!props.isReadOnly) {
    initDnDPanel();
    // 初始化节点事件
    initEvent();
  }

  lf.value.render(props.value);
};

const registerCustomNode = () => {
  lf.value.register(Start);
  lf.value.register(Task);
  lf.value.register(Decision);
  lf.value.register(End);
  lf.value.register(CustomNode);
  lf.value.register(ForkNode);
  lf.value.register(JoinNode);
  lf.value.register(SubProcess);
};

// 设置拖拽面板
const initDnDPanel = () => {
  lf.value.extension.dndPanel.setPatternItems([
    {
      label: "选区",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAOVJREFUOBGtVMENwzAIjKP++2026ETdpv10iy7WFbqFyyW6GBywLCv5gI+Dw2Bluj1znuSjhb99Gkn6QILDY2imo60p8nsnc9bEo3+QJ+AKHfMdZHnl78wyTnyHZD53Zzx73MRSgYvnqgCUHj6gwdck7Zsp1VOrz0Uz8NbKunzAW+Gu4fYW28bUYutYlzSa7B84Fh7d1kjLwhcSdYAYrdkMQVpsBr5XgDGuXwQfQr0y9zwLda+DUYXLaGKdd2ZTtvbolaO87pdo24hP7ov16N0zArH1ur3iwJpXxm+v7oAJNR4JEP8DoAuSFEkYH7cAAAAASUVORK5CYII=",
      callback: () => {
        lf.value.extension.selectionSelect.openSelectionSelect();
        lf.value.once("selection:selected", () => {
          lf.value.extension.selectionSelect.closeSelectionSelect();
        });
      },
    },
    {
      type: "node:start",
      text: "开始",
      label: "开始节点",
      properties: {},
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAnBJREFUOBGdVL1rU1EcPfdGBddmaZLiEhdx1MHZQXApraCzQ7GKLgoRBxMfcRELuihWKcXFRcEWF8HBf0DdDCKYRZpnl7p0svLe9Zzbd29eQhTbC8nv+9zf130AT63jvooOGS8Vf9Nt5zxba7sXQwODfkWpkbjTQfCGUd9gIp3uuPP8bZ946g56dYQvnBg+b1HB8VIQmMFrazKcKSvFW2dQTxJnJdQ77urmXWOMBCmXM2Rke4S7UAW+/8ywwFoewmBps2tu7mbTdp8VMOkIRAkKfrVawalJTtIliclFbaOBqa0M2xImHeVIfd/nKAfVq/LGnPss5Kh00VEdSzfwnBXPUpmykNss4lUI9C1ga+8PNrBD5YeqRY2Zz8PhjooIbfJXjowvQJBqkmEkVnktWhwu2SM7SMx7Cj0N9IC0oQXRo8xwAGzQms+xrB/nNSUWVveI48ayrFGyC2+E2C+aWrZHXvOuz+CiV6iycWe1Rd1Q6+QUG07nb5SbPrL4426d+9E1axKjY3AoRrlEeSQo2Eu0T6BWAAr6COhTcWjRaYfKG5csnvytvUr/WY4rrPMB53Uo7jZRjXaG6/CFfNMaXEu75nG47X+oepU7PKJvvzGDY1YLSKHJrK7vFUwXKkaxwhCW3u+sDFMVrIju54RYYbFKpALZAo7sB6wcKyyrd+aBMryMT2gPyD6GsQoRFkGHr14TthZni9ck0z+Pnmee460mHXbRAypKNy3nuMdrWgVKj8YVV8E7PSzp1BZ9SJnJAsXdryw/h5ctboUVi4AFiCd+lQaYMw5z3LGTBKjLQOeUF35k89f58Vv/tGh+l+PE/wG0rgfIUbZK5AAAAABJRU5ErkJggg==",
    },
    {
      type: "node:task",
      text: "用户任务",
      label: "用户任务",
      properties: {},
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==",
      className: "important-node",
    },
    {
      type: "node:custom",
      text: "自定义任务",
      label: "自定义任务",
      properties: {},
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAOVJREFUOBGtVMENwzAIjKP++2026ETdpv10iy7WFbqFyyW6GBywLCv5gI+Dw2Bluj1znuSjhb99Gkn6QILDY2imo60p8nsnc9bEo3+QJ+AKHfMdZHnl78wyTnyHZD53Zzx73MRSgYvnqgCUHj6gwdck7Zsp1VOrz0Uz8NbKunzAW+Gu4fYW28bUYutYlzSa7B84Fh7d1kjLwhcSdYAYrdkMQVpsBr5XgDGuXwQfQr0y9zwLda+DUYXLaGKdd2ZTtvbolaO87pdo24hP7ov16N0zArH1ur3iwJpXxm+v7oAJNR4JEP8DoAuSFEkYH7cAAAAASUVORK5CYII=",
      className: "import_icon",
    },
    {
      type: "node:decision",
      label: "条件判断",
      properties: {},
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=",
    },
    {
      type: "node:fork",
      label: "分支",
      properties: {},
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAASlJREFUOE+tlL9Lw1AQx78X/GuSzJ2zugqddNPBwS3BJqWCmwnq5lKcXAVHN0EFJ0EQ2pfZ3U1FKohfeaWRYl/zniZvu+P43H3vxxO0/KQJz895+D7B3tO+TCpOI2CQkwAu6WFQ7sqjhjoB/YLrQmwZ1ERTH/EGYkf15cwKDAuukbiwtUaA4TiVbSswyHkNIFKpLMTOJL8ASFQqp06SLcArj+iNMnlYGIqfcxWCjveF23EmN1VAHdDUhqmMsOA5ie5PwAoClUip7T8DgyP6+IT6lU3bz3M+Yw+NFbYObF1yVXarQ6lb2n+vzTKow2K/AoidFzs8YESBvpba53x6s6FtkthY+jkAHySSMpMT6y1b+qu/rzsK4rIn9063bAEeq1Ti+ZhGFZqSfQNEXZkVkDFbFAAAAABJRU5ErkJggg==",
    },
    {
      type: "node:join",
      label: "合并",
      properties: {},
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAOVJREFUOE/lkkESgjAMRZPxIrhz1EPAUTiFZQWu0FPITeQQlnFnbxINU5iQmVKZYQc72v6X5P8grPzhyjzYKvBQU7JD+Cg/HSE03QWvS3zuPfTAUglT/keC/FVgq6Gs4bN3gU7eBUMRXTtrcK+Bpxs9ASDRBWdTPt6pRILqJ2yswVxCZUEJnQV60YM7Cfg4nLsBGt1DPxr7OfHKFxgLWYM966+RCaHSaZ9rSgmBfeTgsiG4IFAIWmswC4SSStikQx+A9IrH5BTH6joUvTIjMLDYQAR5V2CzeLGXCGJvoynHAPp+g8AvqvthFal5qd4AAAAASUVORK5CYII=",
    },
    {
      type: "node:end",
      text: "结束",
      label: "结束节点",
      properties: {},
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAA1BJREFUOBFtVE1IVUEYPXOf+tq40Y3vPcmFIdSjIorWoRG0ERWUgnb5FwVhYQSl72oUoZAboxKNFtWiwKRN0M+jpfSzqJAQclHo001tKkjl3emc8V69igP3znzfnO/M9zcDcKT67azmjYWTwl9Vn7Vumeqzj1DVb6cleQY4oAVnIOPb+mKAGxQmKI5CWNJ2aLPatxWa3aB9K7/fB+/Z0jUF6TmMlFLQqrkECWQzOZxYGjTlOl8eeKaIY5yHnFn486xBustDjWT6dG7pmjHOJd+33t0iitTPkK6tEvjxq4h2MozQ6WFSX/LkDUGfFwfhEZj1Auz/U4pyAi5Sznd7uKzznXeVHlI/Aywmk6j7fsUsEuCGADrWARXXwjxWQsUbIupDHJI7kF5dRktg0eN81IbiZXiTESic50iwS+t1oJgL83jAiBupLDCQqwziaWSoAFSeIR3P5Xv5az00wyIn35QRYTwdSYbz8pH8fxUUAtxnFvYmEmgI0wYXUXcCCSpeEVpXlsRhBnCEATxWylL9+EKCAYhe1NGstUa6356kS9NVvt3DU2fd+Wtbm/+lSbylJqsqkSm9CRhvoJVlvKPvF1RKY/FcPn5j4UfIMLn8D4UYb54BNsilTDXKnF4CfTobA0FpoW/LSp306wkXM+XaOJhZaFkcNM82ASNAWMrhrUbRfmyeI1FvRBTpN06WKxa9BK0o2E4Pd3zfBBEwPsv9sQBnmLVbLEIZ/Xe9LYwJu/Er17W6HYVBc7vmuk0xUQ+pqxdom5Fnp55SiytXLPYoMXNM4u4SNSCFWnrVIzKG3EGyMXo6n/BQOe+bX3FClY4PwydVhthOZ9NnS+ntiLh0fxtlUJHAuGaFoVmttpVMeum0p3WEXbcll94l1wM/gZ0Ccczop77VvN2I7TlsZCsuXf1WHvWEhjO8DPtyOVg2/mvK9QqboEth+7pD6NUQC1HN/TwvydGBARi9MZSzLE4b8Ru3XhX2PBxf8E1er2A6516o0w4sIA+lwURhAON82Kwe2iDAC1Watq4XHaGQ7skLcFOtI5lDxuM2gZe6WFIotPAhbaeYlU4to5cuarF1QrcZ/lwrLaCJl66JBocYZnrNlvm2+MBCTmUymPrYZVbjdlr/BxlMjmNmNI3SAAAAAElFTkSuQmCC",
    },
    // {
    //   type: "node:wfSubProcess",
    //   text: "node子流程",
    //   label: "node子流程",
    //   properties: {},
    //   icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAiFJREFUOE+1lD9oU1EUxn/nviRVB0Hwz1SwJn0WXRylGbSTboJTKwgFwTrqoJK8lKQ0LxUEBR2UolRcDKJQVFxbFx10cNL2JSFFdHARN8Um92jSpqY2bUipdzz3vN/53vu+d4QtPrLFPNoC3XHNYDhXH2y5H4xKZiMRGwIP+vpMhZ+qvBSIqDAkymzgydh60HWB0ax2O8InNZwpJORRDeBmdQJhMPCkp2Ogm9EDhClZ4XAxKR/qwKXXPxl4crRj4LKiPMJHByYrcEIgrXCj4MntTQGj13Wv84s7wOk6QLkWpCSxaVMaD/bmdEaqvGrncK1/lSmxcT3earo4pGtAC7Ot7oujslJfAzSGmY7CbhlrVt4SGHiyql5zVx2OFZIy0Dys1af4v0A3q2cRHholPpeS1w01DYUVZbDsyddavcfXfSEh/69ZKwp7c3rTKFErlES5CAwFnuRdX98ovBfYBgzbEN2hH4SqEaaM8hboA3bPe9K/ymU3p1+MEJ9LyILr6xRKl6mQtBGmg6QcqQfd17IoVxR2APEgJef7JnS/tZRrg4pX5fOKQtfXd1hemBAPqpa7As/DizxdDDNvLaccYY8Kj61lwAi7VBhxDBdshWEM6YaRf4FL/+klYCcwXTVcLiWk6Gb1HrK8vmAy8GQkNq5RY3gC1JXTFJ012yaW00ONZdAwJXZLuyrf2L6Qke/NsenLqTuXlKC51nbBdhTyP82/ASr35RWxFgVJAAAAAElFTkSuQmCC",
    //   className: "import_icon",
    // },
    {
      type: "node:subProcess",
      text: "子流程",
      label: "子流程",
      properties: {},
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAiFJREFUOE+1lD9oU1EUxn/nviRVB0Hwz1SwJn0WXRylGbSTboJTKwgFwTrqoJK8lKQ0LxUEBR2UolRcDKJQVFxbFx10cNL2JSFFdHARN8Um92jSpqY2bUipdzz3vN/53vu+d4QtPrLFPNoC3XHNYDhXH2y5H4xKZiMRGwIP+vpMhZ+qvBSIqDAkymzgydh60HWB0ax2O8InNZwpJORRDeBmdQJhMPCkp2Ogm9EDhClZ4XAxKR/qwKXXPxl4crRj4LKiPMJHByYrcEIgrXCj4MntTQGj13Wv84s7wOk6QLkWpCSxaVMaD/bmdEaqvGrncK1/lSmxcT3earo4pGtAC7Ot7oujslJfAzSGmY7CbhlrVt4SGHiyql5zVx2OFZIy0Dys1af4v0A3q2cRHholPpeS1w01DYUVZbDsyddavcfXfSEh/69ZKwp7c3rTKFErlES5CAwFnuRdX98ovBfYBgzbEN2hH4SqEaaM8hboA3bPe9K/ymU3p1+MEJ9LyILr6xRKl6mQtBGmg6QcqQfd17IoVxR2APEgJef7JnS/tZRrg4pX5fOKQtfXd1hemBAPqpa7As/DizxdDDNvLaccYY8Kj61lwAi7VBhxDBdshWEM6YaRf4FL/+klYCcwXTVcLiWk6Gb1HrK8vmAy8GQkNq5RY3gC1JXTFJ012yaW00ONZdAwJXZLuyrf2L6Qke/NsenLqTuXlKC51nbBdhTyP82/ASr35RWxFgVJAAAAAElFTkSuQmCC",
      className: "import_icon",
    },
  ]);
  // 设置控制面板按钮
  lf.value.extension.control.addItem({
    key: "clear",
    iconClass: "lf-control-clear",
    title: "清空画布",
    text: "清空",
    onClick: (lf, ev) => {
      lf.clearData();
    },
  });
  // 控制面板-添加查看按钮
  lf.value.extension.control.addItem({
    iconClass: "lf-control-see",
    title: "查看流程数据",
    text: "查看",
    onClick: (lf, ev) => {
      graphData.value = { ...props.value, ...lf.getGraphData() };
      dialogType.value = "DataDetail";
      dialogTitle.value = "查看流程数据";
      dialogVisible.value = true;
    },
  });
  // 控制面板-添加保存按钮
  lf.value.extension.control.addItem({
    iconClass: "lf-control-save",
    title: "保存流程",
    text: "保存",
    onClick: (lf, ev) => {
      emit("on-save", { ...props.value, ...lf.getGraphData() });
    },
  });
};
// 监听数据，如果数据发生变化，重新渲染流程图
watch(
  () => props.value,
  (newVal) => {
    lf.value.render(newVal);
  },
  {
    deep: true,
  }
);

onMounted(() => {
  initFlowDesigner();
});

const changeNodeData = (data) => {
  currentClickNodeData.value = data;
};

const initEvent = () => {
  if (props.viewer) return;
  const { eventCenter } = lf.value.graphModel;
  eventCenter.on("node:click", (args) => {
    currentClickNodeData.value = { ...args.data };
  });
  eventCenter.on("edge:click", (args) => {
    currentClickNodeData.value = args.data;
  });
  /**
   * 点击空白区域，获取当前开始节点
   */
  eventCenter.on("blank:click", (e) => {
    const data = lf.value.getGraphData();
    const startNode = data.nodes.find((node) => node.type === "node:start");
    if (startNode) {
      currentClickNodeData.value = { ...startNode };
    } else {
      currentClickNodeData.value = null;
    }
  });
};
</script>

<style scoped>
.m-troyflow-designer {
  height: 100%;
  min-height: 800px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
#TROY-view {
  width: calc(100% - 450px);
  height: 100%;
  min-height: 800px;
}
.property-plane {
  width: 450px;
  height: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #fff;
}
</style>
<style>
.lf-control-see {
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjQ1NjgyNDM0MzQxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEzNzgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDE3MS4yODM2OTJjLTI1NS4wNTQ3NjkgMC00ODUuOTI3Mzg1IDMxMi40MzgxNTQtNDk2Ljc5NzUzOCAzMjcuMzI1NTM4bDAgMC42MzAxNTRDMjYuMDcyNjE1IDUxNC4xMjY3NjkgMjU2Ljk0NTIzMSA4MjYuNDg2MTU0IDUxMiA4MjYuNDg2MTU0YzI1NS4wMTUzODUgMCA0ODUuODg4LTMxMi4zOTg3NjkgNDk2Ljc5NzUzOC0zMjcuMzI1NTM4bDAtMC42MzAxNTRDOTk3LjkyNzM4NSA0ODMuNjgyNDYyIDc2Ny4wMTUzODUgMTcxLjI4MzY5MiA1MTIgMTcxLjI4MzY5Mkw1MTIgMTcxLjI4MzY5MnpNNTEyIDI5MS4yMDk4NDZjMTE0LjU2OTg0NiAwIDIwNy43NTM4NDYgOTMuMTA1MjMxIDIwNy43NTM4NDYgMjA3LjY3NTA3N1M2MjYuNTY5ODQ2IDcwNi42Mzg3NjkgNTEyIDcwNi42Mzg3NjljLTExNC41MzA0NjIgMC0yMDcuNzUzODQ2LTkzLjE4NC0yMDcuNzUzODQ2LTIwNy43NTM4NDZTMzk3LjQ2OTUzOCAyOTEuMjA5ODQ2IDUxMiAyOTEuMjA5ODQ2TTUxMiAzOTUuMjI0NjE1Yy01Ny4yNjUyMzEgMC0xMDMuNjYwMzA4IDQ2LjQzNDQ2Mi0xMDMuNjYwMzA4IDEwMy42NjAzMDhzNDYuMzk1MDc3IDEwMy42NjAzMDggMTAzLjY2MDMwOCAxMDMuNjYwMzA4YzU3LjIyNTg0NiAwIDEwMy42MjA5MjMtNDYuNDM0NDYyIDEwMy42MjA5MjMtMTAzLjY2MDMwOFM1NjkuMjI1ODQ2IDM5NS4yMjQ2MTUgNTEyIDM5NS4yMjQ2MTV6IiBwLWlkPSIxMzc5Ij48L3BhdGg+PC9zdmc+");
}
.lf-control-clear {
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjQ1Nzg5MTYyODczIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIwNDYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODk5LjEgODY5LjZsLTUzLTMwNS42SDg2NGMxNC40IDAgMjYtMTEuNiAyNi0yNlYzNDZjMC0xNC40LTExLjYtMjYtMjYtMjZINjE4VjEzOGMwLTE0LjQtMTEuNi0yNi0yNi0yNkg0MzJjLTE0LjQgMC0yNiAxMS42LTI2IDI2djE4MkgxNjBjLTE0LjQgMC0yNiAxMS42LTI2IDI2djE5MmMwIDE0LjQgMTEuNiAyNiAyNiAyNmgxNy45bC01MyAzMDUuNmMtMC4zIDEuNS0wLjQgMy0wLjQgNC40IDAgMTQuNCAxMS42IDI2IDI2IDI2aDcyM2MxLjUgMCAzLTAuMSA0LjQtMC40IDE0LjItMi40IDIzLjctMTUuOSAyMS4yLTMwek0yMDQgMzkwaDI3MlYxODJoNzJ2MjA4aDI3MnYxMDRIMjA0VjM5MHogbTQ2OCA0NDBWNjc0YzAtNC40LTMuNi04LTgtOGgtNDhjLTQuNCAwLTggMy42LTggOHYxNTZINDE2VjY3NGMwLTQuNC0zLjYtOC04LThoLTQ4Yy00LjQgMC04IDMuNi04IDh2MTU2SDIwMi44bDQ1LjEtMjYwSDc3Nmw0NS4xIDI2MEg2NzJ6IiBwLWlkPSIyMDQ3Ij48L3BhdGg+PC9zdmc+");
}
.lf-control-save {
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjQ1Nzg5MTgwOTgzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI4NDMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNDI2LjY2NjY2NyAxMjhoLTE0OS4zMzMzMzR2MjM0LjQ1MzMzM2MwIDEyLjA3NDY2NyA5LjQ1MDY2NyAyMS41NDY2NjcgMjEuMjA1MzM0IDIxLjU0NjY2N2gyOTguOTIyNjY2YzExLjYyNjY2NyAwIDIxLjIwNTMzMy05LjYgMjEuMjA1MzM0LTIxLjU0NjY2N1YxMjhoLTY0djE0OS41MDRjMCAyMy40NjY2NjctMTkuMTU3MzMzIDQyLjQ5Ni00Mi42MjQgNDIuNDk2aC00Mi43NTJBNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDAgMSA0MjYuNjY2NjY3IDI3Ny41MDRWMTI4ek0xOTIgODk2VjY2MS41NDY2NjdDMTkyIDYwMi40NzQ2NjcgMjM5Ljc4NjY2NyA1NTQuNjY2NjY3IDI5OC44MzczMzMgNTU0LjY2NjY2N2g0MjYuMzI1MzM0QTEwNi43MDkzMzMgMTA2LjcwOTMzMyAwIDAgMSA4MzIgNjYxLjU0NjY2N1Y4OTZoNDIuNTE3MzMzQTIxLjMxMiAyMS4zMTIgMCAwIDAgODk2IDg3NC43NTJWMjczLjY2NEw3NTAuMzM2IDEyOEg3MDR2MjM0LjQ1MzMzM2MwIDU4Ljk2NTMzMy00Ny43MDEzMzMgMTA2Ljg4LTEwNi41Mzg2NjcgMTA2Ljg4SDI5OC41Mzg2NjdBMTA2LjU2IDEwNi41NiAwIDAgMSAxOTIgMzYyLjQ1MzMzM1YxMjhIMTQ5LjI0OEEyMS4yNjkzMzMgMjEuMjY5MzMzIDAgMCAwIDEyOCAxNDkuNDgyNjY3djcyNS4wMzQ2NjZDMTI4IDg4Ni40MjEzMzMgMTM3LjU3ODY2NyA4OTYgMTQ5LjQ4MjY2NyA4OTZIMTkyek00Mi42NjY2NjcgMTQ5LjQ4MjY2N0ExMDYuNjAyNjY3IDEwNi42MDI2NjcgMCAwIDEgMTQ5LjI0OCA0Mi42NjY2NjdINzY4YTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAwIDEgMzAuMTY1MzMzIDEyLjUwMTMzM2wxNzAuNjY2NjY3IDE3MC42NjY2NjdBNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDAgMSA5ODEuMzMzMzMzIDI1NnY2MTguNzUyQTEwNi42NDUzMzMgMTA2LjY0NTMzMyAwIDAgMSA4NzQuNTE3MzMzIDk4MS4zMzMzMzNIMTQ5LjQ4MjY2N0ExMDYuNzUyIDEwNi43NTIgMCAwIDEgNDIuNjY2NjY3IDg3NC41MTczMzNWMTQ5LjQ4MjY2N3ogbTcwNCA1MTIuMDQyNjY2YzAtMTIuMDEwNjY3LTkuNTM2LTIxLjUyNTMzMy0yMS41MDQtMjEuNTI1MzMzSDI5OC44MzczMzNDMjg2LjkzMzMzMyA2NDAgMjc3LjMzMzMzMyA2NDkuNiAyNzcuMzMzMzMzIDY2MS41NDY2NjdWODk2aDQ2OS4zMzMzMzRWNjYxLjU0NjY2N3oiIGZpbGw9IiMwMDAwMDAiIHAtaWQ9IjI4NDQiPjwvcGF0aD48L3N2Zz4=");
}
</style>
