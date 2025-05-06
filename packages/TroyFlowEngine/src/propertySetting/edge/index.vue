<!--
 * @Descripttion: 
 * @version: 
 * @Author: wangmin
 * @Date: 2025-04-30 11:10:29
 * @LastEditors: wangmin
 * @LastEditTime: 2025-05-06 09:48:08
-->
<template>
  <div>
    <el-form :model="form" label-width="100px" ref="formRef" :rules="rules">
      <slot name="form-item-edge-displayName">
        <el-form-item label="名称">
          <el-input v-model="form.displayName" placeholder="请输入名称" />
        </el-form-item>
      </slot>
      <slot name="form-item-edge-conditionExpr">
        <el-form-item>
          <template #label>
            表达式
            <el-tooltip
              content="表达式用法说明：支持JavaScript表达式，可以使用表单数据，例如：#age > 18"
              placement="top"
            >
              <el-icon class="tooltip-icon"><QuestionFilled /></el-icon>
            </el-tooltip>
          </template>
          <el-input v-model="form.conditionExpr" placeholder="请输入表达式" />
        </el-form-item>
      </slot>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { QuestionFilled } from "@element-plus/icons-vue";
const emit = defineEmits(["change"]);
const formRef = ref(null);
const props = defineProps({
  value: {
    type: Object,
  },
});
const form = reactive({
  // 名称
  displayName: "",
  // 表单式
  conditionExpr: "",
});

const rules = reactive({
  conditionExpr: [
    { required: true, message: "请输入表达式" },
    { pattern: /^#/, message: "表达式必须以#开头" },
  ],
});

watch(
  () => props.value,
  (newVal) => {
    if (Object.keys(newVal).length > 0) {
      Object.keys(newVal).forEach((key) => {
        if (key in form) {
          form[key] = newVal[key];
        }
      });
    } else {
      form.displayName = "";
      form.conditionExpr = "";
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => form,
  (newVal) => {
    formRef.value.validate((valid) => {
      if (valid) {
        emit("change", { ...newVal });
      }
    });
  },
  { deep: true }
);
</script>

<style scoped>
.tooltip-icon {
  margin-left: 4px;
  font-size: 16px;
  color: #000;
  cursor: help;
}
</style>
