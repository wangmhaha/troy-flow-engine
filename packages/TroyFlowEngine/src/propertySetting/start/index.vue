<!--
 * @Descripttion: 
 * @version: 
 * @Author: wangmin
 * @Date: 2025-04-28 15:51:57
 * @LastEditors: wangmin
 * @LastEditTime: 2025-05-15 13:41:39
-->
<template>
  <div>
    <el-form :model="form" label-width="100px">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="基础配置" name="basic">
          <el-form-item label="节点名称">
            <el-input v-model="form.displayName" placeholder="请输入节点名称" />
          </el-form-item>
          <slot name="form-item-task-form-key">
            <el-form-item label="流程表单">
              <el-select v-model="form.formKey" placeholder="请选择流程表单">
                <el-option
                  v-for="item in formList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </slot>
        </el-tab-pane>
        <el-tab-pane label="监听器" name="listener">
          <slot name="form-item-task-pre-interceptors">
            <el-form-item label="前置拦截器">
              <el-input
                v-model="form.preInterceptors"
                placeholder="请输入前置拦截器"
              />
            </el-form-item>
          </slot>
          <slot name="form-item-task-post-interceptors">
            <el-form-item label="后置拦截器">
              <el-input
                v-model="form.postInterceptors"
                placeholder="请输入后置拦截器"
              />
            </el-form-item>
          </slot>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script setup>
import { defineProps, watch, reactive, ref } from "vue";

const emit = defineEmits(["change"]);
const activeName = ref("basic");

const form = reactive({
  displayName: "",
  preInterceptors: "",
  postInterceptors: "",
  formKey: "",
});

const props = defineProps({
  value: {
    type: Object,
    default: () => ({}),
  },
  formList: {
    type: Array,
    default: () => [],
  },
});

// 监听props中value的变化
watch(
  () => props.value,
  (newVal) => {
    Object.assign(form, { ...newVal });
  },
  { deep: true, immediate: true }
);

// 监听form的变化
watch(
  form,
  (newVal) => {
    emit("change", { ...newVal });
  },
  { deep: true }
);

const handleClick = (tab, event) => {
  activeName.value = tab.name;
};
</script>

<style scoped></style>
