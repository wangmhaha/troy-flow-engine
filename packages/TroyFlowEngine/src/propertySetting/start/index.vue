<!--
 * @Descripttion: 
 * @version: 
 * @Author: wangmin
 * @Date: 2025-04-28 15:51:57
 * @LastEditors: wangmin
 * @LastEditTime: 2025-04-30 15:22:07
-->
<template>
  <div>
    <el-form :model="form" label-width="100px">
      <el-form-item label="名称">
        <el-input v-model="form.displayName" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="前置拦截器">
        <el-input
          v-model="form.preInterceptors"
          placeholder="请输入前置拦截器"
        />
      </el-form-item>
      <el-form-item label="后置拦截器">
        <el-input
          v-model="form.postInterceptors"
          placeholder="请输入后置拦截器"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { defineProps, watch, reactive } from "vue";

const emit = defineEmits(["change"]);

const form = reactive({
  displayName: "",
  preInterceptors: "",
  postInterceptors: "",
});

const props = defineProps({
  value: {
    type: Object,
    default: () => ({}),
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
</script>

<style scoped></style>
