<!--
 * @Descripttion: 
 * @version: 
 * @Author: wangmin
 * @Date: 2025-04-28 15:43:58
 * @LastEditors: wangmin
 * @LastEditTime: 2025-05-15 13:41:02
-->
<template>
  <div class="m-property-setting">
    <div class="m-property-setting-title">
      <span>属性面板 - {{ nodeData?.text?.value }}</span>
    </div>
    <div class="m-property-setting-content">
      <component
        :is="currentComponent"
        v-if="currentComponent"
        @change="handleChange"
        :value="formValue"
        :getDeptTree="getDeptTree"
        :getUserList="getUserList"
        :getRoleList="getRoleList"
        :getFormList="getFormList"
        :formList="formList"
        :currentNodeData="currentNodeData"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, watch, onMounted } from "vue";
const formValue = ref({});
const formList = ref([]);
const emit = defineEmits(["changeNodeData"]);
const currentNodeData = ref([]);

const props = defineProps({
  nodeData: {
    type: Object,
    default: () => ({}),
  },
  getDeptTree: {
    type: Function,
    default: async () => {},
  },
  getUserList: {
    type: Function,
    default: async () => {},
  },
  getRoleList: {
    type: Function,
    default: async () => {},
  },
  getFormList: {
    type: Function,
    default: async () => {},
  },
  lf: {
    type: Object,
    default: () => ({}),
  },
});

const currentComponent = ref(null);

// 监听节点数据变化
watch(
  () => props.nodeData,
  async (newVal) => {
    if (!newVal) return;
    try {
      // 根据节点类型动态导入对应的属性设置组件
      formValue.value = props.lf.getProperties(newVal.id) || {};
      let type = newVal.type.replace("node:", "");
      // 如果是点击的是边 把type设置为edge
      type = type === "polyline" ? "edge" : type;
      const module = await import(`./${type}/index.vue`);
      currentComponent.value = module.default;
      // 获取当前所有节点数据
      currentNodeData.value = props.lf
        .getGraphData()
        .nodes.filter(
          (item) => item.type == "node:task" || item.type === "node:start"
        );
    } catch (err) {
      console.error("加载属性设置组件失败:", err);
      currentComponent.value = null;
    }
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  if (props.getFormList) {
    props.getFormList().then((res) => {
      formList.value = res;
    });
  }
});

// 处理节点数据更新
const handleChange = (data) => {
  if (props.nodeData.type === "node:start") {
    props.lf.setProperties(props.nodeData.id, {
      displayName: data.displayName,
      preInterceptors: data.preInterceptors,
      postInterceptors: data.postInterceptors,
      formKey: data.formKey,
    });
  } else if (props.nodeData.type === "node:task") {
    props.lf.setProperties(props.nodeData.id, {
      displayName: data.displayName,
      preInterceptors: data.preInterceptors,
      postInterceptors: data.postInterceptors,
      formKey: data.formKey,
      approverType: data.approverType,
      approverValue: data.approverValue,
      approverText: data.approverText,
      performType: data.performType,
      expireTime: data.expireTime,
      buttons: data.buttons,
      rejectNode: data.rejectNode,
      // rejectNodeList: data.rejectNodeList,
    });
  } else if (props.nodeData.type === "polyline") {
    props.lf.setProperties(props.nodeData.id, {
      displayName: data.displayName,
      conditionExpr: data.conditionExpr,
    });
  }
  if (data.displayName) {
    props.lf.updateText(props.nodeData.id, data.displayName);
  }
};
</script>

<style scoped>
.m-property-setting {
  width: 100%;
  height: 100%;
  /* padding: 16px; */
  box-sizing: border-box;
}
.m-property-setting-title {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 10px;
  border-bottom: 1px solid #e4e7ed;
  box-sizing: border-box;
}
.m-property-setting-title span {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}
.m-property-setting-content {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>
