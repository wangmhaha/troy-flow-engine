<!--
 * @Descripttion: 
 * @version: 
 * @Author: wangmin
 * @Date: 2025-04-28 16:49:31
 * @LastEditors: wangmin
 * @LastEditTime: 2025-05-06 10:53:50
-->
<template>
  <div>
    <el-form :model="form" label-width="100px">
      <el-form-item label="名称">
        <el-input v-model="form.displayName" placeholder="请输入名称" />
      </el-form-item>
      <slot name="form-item-task-form-key">
        <el-form-item label="选择表单">
          <el-select v-model="form.formKey" placeholder="请选择表单">
            <el-option label="表单1" value="form1"></el-option>
            <el-option label="表单2" value="form2"></el-option>
            <el-option label="表单3" value="form3"></el-option>
          </el-select>
        </el-form-item>
      </slot>
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
      <slot name="form-item-task-approver-type">
        <el-form-item label="审批人方式">
          <el-radio-group v-model="form.approverType">
            <el-radio-button label="指定用户" value="USER" />
            <el-radio-button label="角色" value="ROLE" />
            <el-radio-button label="部门" value="DEPT" />
          </el-radio-group>
        </el-form-item>
      </slot>
      <slot name="form-item-task-approver-value">
        <el-form-item label="选择用户" v-if="form.approverType === 'USER'">
          <SelectUser
            v-model:value="form.approverValue"
            v-model:approverText="form.approverText"
            :getDeptTree="getDeptTree"
            :getUserList="getUserList"
          />
        </el-form-item>
        <el-form-item label="选择角色" v-if="form.approverType === 'ROLE'">
          <el-select
            v-model="form.approverValue"
            placeholder="请选择角色"
            multiple
          >
            <el-option
              v-for="role in roleList"
              :key="role.roleId"
              :label="role.roleName"
              :value="role.roleId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" v-if="form.approverType === 'DEPT'">
          <el-tree-select
            placeholder="请选择部门"
            v-model="form.approverValue"
            :data="deptList"
            :props="{ label: 'label', value: 'id' }"
          />
        </el-form-item>
      </slot>
      <slot name="form-item-task-perform-type">
        <el-form-item label="参与类型">
          <el-select v-model="form.performType" placeholder="请选择参与类型">
            <el-option label="普通参与" value="NORMAL" />
            <el-option label="会签参与" value="COUNTERSIGN" />
          </el-select>
        </el-form-item>
      </slot>
      <slot name="form-item-task-expire-time">
        <el-form-item label="期望完成时间">
          <el-input-number
            v-model="form.expireTime"
            placeholder="请输入期望完成时间"
          >
            <template #suffix>
              <span>分钟</span>
            </template>
          </el-input-number>
        </el-form-item>
      </slot>
      <slot name="form-item-task-buttons">
        <el-form-item label="按钮配置">
          <el-checkbox-group v-model="form.buttons">
            <el-checkbox label="同意" value="agree" />
            <el-checkbox label="驳回" value="reject" />
            <el-checkbox label="转办" value="transfer" />
          </el-checkbox-group>
        </el-form-item>
      </slot>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import SelectUser from "./selectUser.vue";

const roleList = ref([]);
const deptList = ref([]);
const form = reactive({
  // 名称
  displayName: "",
  // 前置拦截器
  preInterceptors: "",
  // 后置拦截器
  postInterceptors: "",
  // 选择表单
  formKey: "",
  // 审批人方式
  approverType: "USER",
  // 审批人
  approverValue: "",
  // 审批人名称：
  approverText: "",
  // 参与类型
  performType: "NORMAL",
  // 期望完成时间
  expireTime: 0,
  // 按钮配置
  buttons: [],
});
const emit = defineEmits(["change"]);
const props = defineProps({
  value: {
    type: Object,
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
});

watch(
  () => props.value,
  (newVal) => {
    if (!newVal) return;
    // 遍历对象的每个属性进行赋值，确保响应式更新
    if (Object.keys(newVal).length > 0) {
      Object.keys(newVal).forEach((key) => {
        if (key in form) {
          form[key] = newVal[key];
        }
      });
    } else {
      form.displayName = "";
      form.formKey = "";
      form.preInterceptors = "";
      form.postInterceptors = "";
      form.approverType = "USER";
      form.approverValue = "";
      form.approverText = "";
      form.performType = "NORMAL";
      form.expireTime = 0;
      form.buttons = [];
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => form.approverType,
  (newVal) => {
    if (newVal === "ROLE") {
      props.getRoleList().then((res) => {
        roleList.value = res;
      });
    }
    if (newVal === "DEPT") {
      props.getDeptTree().then((res) => {
        deptList.value = res;
      });
    }
  }
);

watch(
  () => form,
  (newVal) => {
    emit("change", { ...newVal });
  },
  { deep: true }
);
</script>

<style scoped></style>
